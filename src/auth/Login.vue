<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar class="teal" dark>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn :to="'sign-up'" flat>Sign Up</v-btn>
            </v-toolbar-items>
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
                    label="Password"
                    type="password"
                    min=12
                    counter
                    v-model="pass"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-btn block secondary :loading="loading" @click="submit">Login</v-btn>
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
    submit() {
      this.loading = true
      Auth.login(this.login, this.pass).then(res => {
        this.$router.push({name: 'balance'})
        this.loading = false
      }, err => {
        this.err = err
        this.snackbar = true
        this.loading = false
      })
    },
  }
}
</script>
