// This vuex module contains data that *should* be persisted

import Vue from 'vue'

const state = {
  activeApi: null,
  apis: {},
  darkUi: true,
  navState: true,
  navIcon: false,
  bingMapsKey: 'AgXa-GFmIi0y2SeDifLy5FsDF2V6cVINsnrAT9RtBLdsOGkStZSXL_MBwATgvyO6',
  videostreams: {},
  modulesActive: {
    'cockpit': false,
    'planner': false,
    'analysis': false,
    'config': true,
    'system': true,
    'video': true
  },
  discoveries: {},
  uiSettings: {
    'dark': true,
    'autoDark': false,
    'colorBg': true,
    'notifyServices': true,
    'notifyDiscovery': true
  }
}

const mutations = {
  addApi (state, data) {
    Vue.set(state.apis, data.key, data.data)
  },
  addVideoStream (state, data) {
    Vue.set(state.videostreams, data.key, data.data)
  },
  removeApi (state, key) {
    Vue.delete(state.apis, key)
  },
  removeVideoStream (state, key) {
    Vue.delete(state.videostreams, key)
  },
  setActiveApi (state, api) {
    state.activeApi = api
  },
  setApiData (state, data) {
    state.apis[data.api] = data.data
  },
  setDarkUi (state, value) {
    state.darkUi = value
  },
  setNavIcon (state, value) {
    state.navIcon = value
  },
  setNavState (state, value) {
    state.navState = value
  },
  updateVideoStream (state, data) {
    state.videostreams[data.key] = data.data
  },
  addDiscovery (state, data) {
    Vue.set(state.discoveries, data.key, data.data)
  },
  updateDiscovery (state, data) {
    state.discoveries[data.key] = data.data
  },
  removeDiscovery (state, key) {
    Vue.delete(state.discoveries, key)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
