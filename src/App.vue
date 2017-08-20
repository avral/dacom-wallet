<template>
  <v-app id="example-3" toolbar>
    <v-navigation-drawer permanent clipped light>
      <v-list dense class="pt-0">
        <v-list-tile v-for="item in items" :key="item.title" :to="item.href">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="teal" dark>
      <v-toolbar-title>DACom wallet</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { icon: 'bubble_chart', title: 'Market', href: '/' },
          { icon: 'bubble_chart', title: 'Balance', href: 'balance' },
          { icon: 'bubble_chart', title: 'History', href: 'history' },
        ],
        title: 'DACom'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
