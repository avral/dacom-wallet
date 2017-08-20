<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar class="teal" dark>
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Account"
                    v-model="login"
                    counter
                    min="3"
                    :rules="[rules.required, rules.login]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    type="password"
                    label="Password"
                    v-model="pass"
                    min="12"
                    counter
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-btn block secondary :loading="loading" @click="submit">Sign Up</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="2000"
      :top="true"
      v-model="snackbar">
      {{ err }}
      <v-btn flat class="pink--text" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import Auth from '../auth'


export default {
  data () {
    return {
      err: '',
      snackbar: false,
      loading: false,
      login: '',
      pass: '',
      rules: {
        required: (value) => !!value || 'Required.',
        login: (val) => {
          const pattern = /^[a-zA-Z0-9.-]+$/
          return pattern.test(val) || 'Invalid login'
        },
      }
    }
  },

  methods: {
    validate() {
      return this.rules.login(this.login) === true && this.pass.length >= 12 && this.login.length > 2
    },
    submit() {
      if (this.validate()) {
        this.loading = true
        Auth.signUp(this.login, this.pass).then(res => {
          this.$router.push({name: 'balance'})
          this.loading = false
        }, err => {
          console.log(999, err)
          this.err = err
          this.snackbar = true
          this.loading = false
        })
      }
    }
  }
}
</script>
