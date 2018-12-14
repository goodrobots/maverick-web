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
    activeApi: null,
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
    addApi (state, data) {
      Vue.set(state.apis, data.title, data.value)
    },
    setActiveApi (state, api) {
      state.activeApi = api
    },
    setApiState (state, data) {
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
