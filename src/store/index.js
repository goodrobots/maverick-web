import Vue from 'vue'
import Vuex from 'vuex'
import core from './modules/core'
import cockpit from './modules/cockpit'
import planner from './modules/planner'
import config from './modules/config'
import analysis from './modules/analysis'
import maverick from './modules/maverick'
import video from './modules/video'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    core,
    cockpit,
    planner,
    config,
    analysis,
    maverick,
    video
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
    moduleData: {
      'cockpit': {
        'color': 'mavorange',
        'icon': 'mdi-airplane-takeoff'
      },
      'planner': {
        'color': 'mavblue',
        'icon': 'mdi-map-marker-circle'
      },
      'config': {
        'color': 'mavpurple',
        'icon': 'mdi-settings'
      },
      'analysis': {
        'color': 'mavgreen',
        'icon': 'mdi-equalizer'
      },
      'maverick': {
        'color': 'mavgrey',
        'icon': 'mdi-console'
      },
      'video': {
        'color': 'mavblue',
        'icon': 'mdi-video'
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
