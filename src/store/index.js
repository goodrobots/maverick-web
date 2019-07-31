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
    apis: {},
    apiTimestamps: {},
    statusData: {},
    vehicleData: {},
    activeApi: null,
    appVisible: true,
    bingMapsKey: 'AgXa-GFmIi0y2SeDifLy5FsDF2V6cVINsnrAT9RtBLdsOGkStZSXL_MBwATgvyO6',
    moduleData: {
      'cockpit': {
        'color': 'mavorange',
        'icon': 'flight_takeoff'
      },
      'planner': {
        'color': 'mavblue',
        'icon': 'explore'
      },
      'config': {
        'color': 'mavpurple',
        'icon': 'settings'
      },
      'analysis': {
        'color': 'mavgreen',
        'icon': 'equalizer'
      }
    }
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
    addApi (state, data) {
      Vue.set(state.apis, data.title, data.value)
    },
    setActiveApi (state, api) {
      state.activeApi = api
    },
    setApiState (state, data) {
      state.apis[data.api].state = data.value
    },
    setApiUuid (state, data) {
      state.apis[data.api].uuid = data.value
    },
    setApiIcon (state, data) {
      state.apis[data.api].icon = data.value
    },
    setApiAuth (state, data) {
      state.apis[data.api].auth = data.value
    },
    setApiSeen (state, data) {
      state.apiTimestamps[data.api] = data.value
    },
    setAppVisible (state, data) {
      state.appVisible = data
    },
    setStatusData (state, data) {
      if (data.api in state.statusData) {
        state.statusData[data.api] = data.message
      } else {
        Vue.set(state.statusData, data.api, data.message)
      }
    },
    setVehicleData (state, data) {
      if (data.api in state.vehicleData) {
        state.vehicleData[data.api] = data.message
      } else {
        Vue.set(state.vehicleData, data.api, data.message)
      }
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
