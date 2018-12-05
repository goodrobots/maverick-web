import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './plugins/apollo/vue-apollo'
import './plugins/vuetify'
import './plugins/vuelayers'
import './plugins/vuetimers'
import './plugins/registerServiceWorker'

// Sync the vuex store with router
sync(store, router)

Vue.config.productionTip = false

window.App = new Vue({
  router,
  store,
  render: h => h(App),
  apolloProvider: createProvider()
}).$mount('#app')

console.log('%c ** Welcome to Maverick Web GCS ** ', 'background: blue; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;')
