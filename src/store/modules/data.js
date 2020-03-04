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
  }}

const mutations = {
  addApi (state, data) {
    Vue.set(state.apis, data.title, data.value)
  },
  setApiData (state, data) {
    state.apis[data.api] = data.data
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
