import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { apolloProvider } from './vue-apollo'

import './stylus/main.styl'

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
  components: { App },
  template: '<App/>'
})
