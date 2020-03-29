import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import core from './modules/core'
import data from './modules/data'
import cockpit from './modules/cockpit'
import planner from './modules/planner'
import system from './modules/system'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'maverick',
  storage: window.localStorage,
  reducer: (state) => ({ 
    data: state.data,
    cockpit: state.cockpit,
    planner: state.planner
  }),
})

export default new Vuex.Store({
  plugins: [
    vuexPersist.plugin
  ],

  modules: {
    core,
    data,
    cockpit,
    planner,
    system
  },

  state: {
    fullScreen: false,  // this should not be persisted
    appVisible: true // this should not be persisted
  },

  mutations: {
    setAppVisible (state, data) {
      state.appVisible = data
    },
    setFullScreen (state, value) {
      state.fullScreen = value
    }
  }
})
