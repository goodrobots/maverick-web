import Vue from 'vue'

// This vuex module contains data that *should* be persisted

const state = {
  apis: {},
  darkUi: true,
  navDrawer: true,
  navColor: null,
  navState: true,
  navIcon: false,
  moduleName: null,
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
  },
  videostreams: {}
}

const mutations = {
  addApi (state, data) {
    Vue.set(state.apis, data.key, data.data)
  },
  setApiData (state, data) {
    state.apis[data.api] = data.data
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
  setModuleName (state, value) {
    state.moduleName = value
  },
  addVideoStream (state, data) {
    Vue.set(state.videostreams, data.key, data.data)
  },
  updateVideoStream (state, data) {
    state.videostreams[data.key] = data.data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
