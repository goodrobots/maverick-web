import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import { apolloProvider } from './graphql/vue-apollo'

import './stylus/main.styl'

// Sync the vuex store with router
sync(store, router)

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepOrange.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.App = new Vue({
  provide: apolloProvider.provide(),
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
