import Vue from 'vue'
import { buildClientSchema } from 'graphql'
import axios from 'axios'

// This vuex module contains data that should *not* be persisted

const state = {
  apiTimestamps: {},
  statusData: {},
  vehicleData: {},
  activeApi: null,
  graphqlSchema: {}
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
        console.error(err) // eslint-disable-line no-console
        return undefined
      }
    }
  },
  graphqlSchemaVerified(state) {
    return (api, hash) => {
      try {
        return state.graphqlSchema[api].verified[hash]
      } catch (err) {
        console.error(err) // eslint-disable-line no-console
        return undefined
      }
    }
  }
}

const mutations = {
  setActiveApi (state, api) {
    state.activeApi = api
  },
  setApiSeen (state, data) {
    state.apiTimestamps[data.api] = data.value
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
  },
  clearGraphqlVerified(state, api) {
    state.graphqlSchema[api].verified = {}
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
