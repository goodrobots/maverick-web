import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { createProvider } from './plugins/apollo/vue-apollo'
import VueTimers from 'vue-timers'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
import './stylus/main.styl'

// Declare timers that are used throughout components to rate limit
Vue.use(VueTimers)

// Import vuelayers and declare global projection to gps standard
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})

// Sync the vuex store with router
sync(store, router)

Vue.config.productionTip = false
// Vue.config.devtools = true // Explicitly enable devtools, even in production builds

/* eslint-disable no-new */
window.App = new Vue({
  provide: createProvider().provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
