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
    'maverick': true,
    'video': true
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
