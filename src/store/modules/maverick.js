import { schema } from '../modules/schema'
import { buildClientSchema } from 'graphql'
import axios from 'axios'

const state = {
  graphqlSchema: {},
  monacoSchema: schema,
  monacoCode: [
    "{",
    "    ",
    "}"
  ].join('\n')
}

const actions = {
  fetchSchema({ commit }, {api, introspectionEndpoint}) {
    return new Promise((resolve, reject) => {
      axios
        .get(introspectionEndpoint)
        .then((response) => {
          console.log(response);
          commit('updateGraphqlSchema', {api:api, graphqlSchema:buildClientSchema(response.data)})
          resolve()
        }, (error) => {
          console.log(error);
        });
    })
  }
}

const getters = {
  graphqlSchema(state) {
    return api => {
      return state.graphqlSchema[api].schema
    }
  },
  graphqlSchemaVerified(state) {
    return (api, hash) => {
      return state.graphqlSchema[api].verified[hash]
    }
  }
}

const mutations = {
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
  getters,
  actions,
  mutations
}