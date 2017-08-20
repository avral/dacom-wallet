import axios from 'axios'

import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import Auth from './auth'
import Login from './auth/Login.vue'
import SignUp from './auth/SignUp.vue'

import Balance from './components/Balance.vue'
import Market from './components/Balance.vue'
import History from './components/History.vue'


Vue.use(Vuetify)
Vue.use(VueRouter)

Vue.prototype.$http = axios

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance,
      meta: {
        auth: true
      }
    },
    {
      path: '/market',
      name: 'market',
      component: Market,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        auth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !Auth.isAuth) {
    next({name: 'login'})
  } else {
    next()
  }
})


Auth.init().then(() => {
  new Vue({
    router,
    el: '#app',
    render: h => h(App)
  })
}, () => document.write('Not connected to node!'))
