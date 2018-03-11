import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    navColor: null,
    navState: false,
    navIcon: false,
    apis: {
      'devSitl': 'Dev VM: SITL',
      'devPx4sitl': 'Dev VM: PX4 SITL',
      'wwwSitl': 'WWW VM: SITL'
    },
    activeApi: 'devSitl',
    navDrawer: true
  },
  mutations: {
    setNavColor (state, color) {
      state.navColor = color
    },
    setNavIcon (state, value) {
      state.navIcon = value
    },
    setNavDrawer (state, value) {
      state.navDrawer = value
    },
    setApi (state, api) {
      state.activeApi = api
    },
    setNavState (state, value) {
      state.navState = value
    }
  }
})
