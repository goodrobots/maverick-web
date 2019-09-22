// Load Vue
import Vue from 'vue'
import App from './App.vue'

// Load router and store
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

// Load extra plugins
import vuetify from '@/plugins/vuetify'
import './plugins/vuelayers'
import './plugins/vuecesium'
import './plugins/vuetimers'
import './plugins/vuelodash'
import './plugins/vuebar'
import './plugins/vuevisibility'
import './plugins/registerServiceWorker'
import { createProvider } from './plugins/graphql/vue-apollo'

// Load maverick plugins
import './plugins/maverick'
import './plugins/mavlink'

// Sync the vuex store with router
sync(store, router)

// Create app
Vue.config.productionTip = false
window.app = new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
