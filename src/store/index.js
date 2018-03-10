import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    appTitle: 'Maverick Web',
    navColor: null,
    navState: false,
    apis: {
      'devSitl': 'Dev VM: SITL',
      'devPx4sitl': 'Dev VM: PX4 SITL',
      'wwwSitl': 'WWW VM: SITL'
    },
    activeApi: 'devSitl',
    configDrawer: true
  },
  mutations: {
    setNavColor (state, color) {
      state.navColor = color
    },
    setConfigDrawer (state, value) {
      state.configDrawer = value
    },
    setApi (state, api) {
      state.activeApi = api
    },
    setNavState (state, value) {
      state.navState = value
    }
  }
})
