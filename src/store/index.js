import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    appTitle: 'Maverick Web',
    navColor: null,
    vehicles: {
      'dev': 'Plane: Nano Talon',
      'www': 'Copter: Dronie'
    },
    configDrawer: true
  },
  mutations: {
    setNavColor (state, color) {
      state.navColor = color
    },
    setConfigDrawer (state, value) {
      state.configDrawer = value
    }
  }
})
