// This vuex module contains data that should *not* be persisted

import Vue from 'vue'

import { buildClientSchema } from 'graphql'
import axios from 'axios'

const state = {
  apiSeen: {},
  apiState: {},
  graphqlSchema: {},
  moduleName: null,
  modules: {
    'cockpit': {
      'color': 'orange',
      'icon': 'mdi-airplane-takeoff',
      'enabled': false
    },
    'planner': {
      'color': 'yellow',
      'icon': 'mdi-map-marker-circle',
      'enabled': false
    },
    'analysis': {
      'color': 'green',
      'icon': 'mdi-equalizer',
      'enabled': false
    },
    'config': {
      'color': 'deep-purple',
      'icon': 'mdi-cog-outline',
      'enabled': true
    },
    'system': {
      'color': 'blue-grey',
      'icon': 'mdi-desktop-classic',
      'enabled': true
    },
    'video': {
      'color': 'blue',
      'icon': 'mdi-video',
      'enabled': true
    }
  },
  navColor: null,
  navDrawer: null,
  navDrawerEnable: true,
  serviceData: {},
  sslState: null,
  statusData: {},
  vehicleData: {}
}

const actions = {
  fetchSchema({ commit }, {api, schemaEndpoint}) {
    return new Promise((resolve, reject) => {
      axios
        .get(schemaEndpoint)
        .then((response) => {
          commit('updateGraphqlSchema', {api:api, graphqlSchema:buildClientSchema(response.data)})
          resolve()
        }, (error) => {
          console.log(error); // eslint-disable-line no-console
        });
    })
  }
}

const getters = {
  graphqlSchema(state) {
    return api => {
      try {
        return state.graphqlSchema[api].schema
      } catch (err) {
        // console.error(err) // eslint-disable-line no-console
        return undefined
      }
    }
  },
  graphqlSchemaVerified(state) {
    return (api, hash) => {
      try {
        return state.graphqlSchema[api].verified[hash]
      } catch (err) {
        // console.error(err) // eslint-disable-line no-console
        return undefined
      }
    }
  }
}

const mutations = {
  addApiState (state, api) {
    Vue.set(state.apiState, api, {state: false, schemaready: false, auth: false, uuid: null, icon: null})
  },
  clearGraphqlVerified(state, api) {
    state.graphqlSchema[api].verified = {}
  },
  setApiAuth (state, data) {
    state.apiState[data.api].auth = data.value
  },
  setApiIcon (state, data) {
    state.apiState[data.api].icon = data.value
  },
  setApiSeen (state, data) {
    if (!state.apiSeen.hasOwnProperty(data.api)) {
      Vue.set(state.apiSeen, data.api, data.lastseen)
    } else {
      state.apiSeen[data.api] = data.lastseen
    }
  },
  setApiState (state, data) {
    state.apiState[data.api][data.field] = data.value
  },
  setApiUuid (state, data) {
    state.apiState[data.api].uuid = data.value
  },
  setModuleName (state, value) {
    state.moduleName = value
  },
  setNavColor (state, color) {
    state.navColor = color
  },
  setNavDrawer (state, value) {
    state.navDrawer = value
  },
  setNavDrawerEnable (state, value) {
    state.navDrawerEnable = value
  },
  setServiceData (state, data) {
    if (data.api in state.serviceData) {
      if (data.name in state.serviceData[data.api]) {
        state.serviceData[data.api][data.name] = data.message
      } else {
        Vue.set(state.serviceData[data.api], data.name, data.message)
      }
    } else {
      Vue.set(state.serviceData, data.api, {})
      Vue.set(state.serviceData[data.api], data.name, data.message)
    }
  },
  setSslState (state, value) {
    state.sslState = value
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
  updateGraphqlSchema(state, {api, graphqlSchema}) {
    state.graphqlSchema[api] = {schema: graphqlSchema, verified: {}}
  },
  updateGraphqlVerified(state, {api, hash, ret}) {
    state.graphqlSchema[api].verified[hash] = ret
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
