import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import core from './modules/core'
import cockpit from './modules/cockpit'
import planner from './modules/planner'
import maverick from './modules/maverick'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'maverick',
  storage: window.localStorage,
  reducer: (state) => ({ 
    core: state.core,
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
    cockpit,
    planner,
    maverick
  },

  state: {
    darkUi: true,
    navDrawer: true,
    navColor: null,
    navState: true,
    navIcon: false,
    fullScreen: false,
    moduleName: null,
    appVisible: true,
    bingMapsKey: 'AgXa-GFmIi0y2SeDifLy5FsDF2V6cVINsnrAT9RtBLdsOGkStZSXL_MBwATgvyO6',
    modules: {
      'cockpit': {
        'color': 'mavorange',
        'icon': 'mdi-airplane-takeoff',
        'enabled': false
      },
      'planner': {
        'color': 'mavblue',
        'icon': 'mdi-map-marker-circle',
        'enabled': false
      },
      'config': {
        'color': 'mavpurple',
        'icon': 'mdi-settings',
        'enabled': true
      },
      'analysis': {
        'color': 'mavgreen',
        'icon': 'mdi-equalizer',
        'enabled': false
      },
      'maverick': {
        'color': 'mavgrey',
        'icon': 'mdi-console',
        'enabled': true
      },
      'video': {
        'color': 'mavblue',
        'icon': 'mdi-video',
        'enabled': true
      }
    }
  },

  mutations: {
    setAppVisible (state, data) {
      state.appVisible = data
    },
    setDarkUi (state, value) {
      state.darkUi = value
    },
    setNavColor (state, color) {
      state.navColor = color
    },
    setNavIcon (state, value) {
      state.navIcon = value
    },
    setNavDrawer (state, value) {
      state.navDrawer = value
    },
    setNavState (state, value) {
      state.navState = value
    },
    setFullScreen (state, value) {
      state.fullScreen = value
    },
    setModuleName (state, value) {
      state.moduleName = value
    }
  }
})
