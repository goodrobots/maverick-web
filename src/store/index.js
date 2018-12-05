import Vue from 'vue'
import Vuex from 'vuex'
import cockpit from './modules/cockpit'
import planner from './modules/planner'
import config from './modules/config'
import analysis from './modules/analysis'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cockpit,
    planner,
    config,
    analysis
  },

  state: {
    darkUi: true,
    navDrawer: true,
    navColor: null,
    navState: true,
    navIcon: false,
    fullScreen: false,
    moduleName: null,
    apis: {
      // fc: 'Local Flight Controller',
      // fc: fcClient,
      sitl1: {
        'name': 'SITL Copter 1',
        'color-light': 'rgba(11,11,11,0.3)',
        'color-dark': 'rgba(11,11,11,0.9)',
        'state': false
      },
      copter2: {
        'name': 'SITL Copter 2',
        'color-light': '#336666',
        'color-dark': '#336666',
        'state': false
      },
      copter3: {
        'name': 'SITL Copter 3',
        'color-light': '#993399',
        'color-dark': '#993399',
        'state': false
      },
      plane1: {
        'name': 'SITL Plane 1',
        'color-light': 'rgba(225,33,33,0.3)',
        'color-dark': 'rgba(225,33,33,0.9)',
        'state': false
      },
      rover1: {
        'name': 'SITL Rover 1',
        'color-light': '#cccccc',
        'color-dark': '#cccccc',
        'state': false
      },
      sub1: {
        'name': 'SITL Sub 1',
        'color-light': '#ff9933',
        'color-dark': '#ff9933',
        'state': false
      }
    },
    activeApi: 'sitl1',
    bingMapsKey:
      'AgXa-GFmIi0y2SeDifLy5FsDF2V6cVINsnrAT9RtBLdsOGkStZSXL_MBwATgvyO6'
  },

  mutations: {
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
    setApi (state, api) {
      state.activeApi = api
    },
    setApiState (state, data) {
      console.log(`api: ${data.api}, value: ${data.value}`)
      state.apis[data.api].state = data.value
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
