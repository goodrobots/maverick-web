import { createClient, onLogin } from '../graphql/apollo-functions'
import clients from './clients.json'

const plugin = {
  install (Vue, options) {
    console.log('Installing MaverickApi plugin')

    Vue.mixin({
      data () {
        return {
        }
      },

      computed: {
        apis () {
          return this.$store.state.apis
        },
        activeApi () {
          return this.$store.state.activeApi
        }
      },

      mounted () {
        // Only execute this if root component, otherwise skip it.
        // Theoretically, this should execute once after the main Vue component is loaded,
        //  and the apollo plugin and provider has loaded.
        if (!this.$parent) {
          // Process each defined Maverick-API instance and create a client and base heartbeat subscription for each api
          for (const client in clients) {
            this.createClient(client, clients[client])
          }
        }
      },

      methods: {
        createClient (api, clientdata) {
          // Add an apollo client
          const client = createClient({
            httpEndpoint: clientdata.httpEndpoint,
            wsEndpoint: clientdata.wsEndpoint,
            websocketsOnly: clientdata.websocketsOnly
          })
          this.$set(this.$apollo.provider.clients, api, client)
          // Add a vuex apis entry
          this.$store.commit('addApi', {
            title: api,
            value: { ...clientdata, ...{ state: false, auth: false } }
          })
          // Set the client auth token
          if (clientdata.authToken) {
            this.logDebug(`Setting auth token: ${clientdata.authToken}`)
            onLogin(client, clientdata.authToken, api, this.$store)
          }
        },

        createQuery (message, gql, api, container, callback = null, errorCallback = null, skip = false, variables = null) {
          const queryKey = [message, '_', api].join('')
          if (!this.$apollo.queries[queryKey] && this.$apollo.provider.clients[api]) {
            this.logInfo(`Creating GQL Query: api: ${api}, message: ${message}, queryKey: ${queryKey}`)
            // If a callback function has been passed use it as the result processor, otherwise use a default function
            const resultFunction = (callback instanceof Function) ? callback : function (data, key) {
              api = key.replace([message, '_'].join(''), '')
              if (data.data && message in data.data) {
                // Store the message data and set the api state to active
                // Note: Must use this.$set to add object property, to keep new property reactive
                this.$set(this[container], api, data.data[message])
                this.$store.commit('setApiState', { api: api, value: true })
              }
            }
            let queryFields = {
              client: api,
              query: gql,
              manual: true,
              result: resultFunction,
              skip: skip
            }
            // If errorCallback is set, merge into queryFields
            if (errorCallback instanceof Function) {
              queryFields = { ...queryFields, error: errorCallback }
            }
            // If variables is set, merge into queryFields
            if (variables instanceof Object || variables instanceof String) {
              queryFields = { ...queryFields, variables: variables }
            }
            this.$apollo.addSmartQuery(queryKey, queryFields)
          }
        },

        createSubscription (message, gql, api, container, callback = null, errorCallback = null, skip = false, variables = null) {
          const subKey = [message, '_', api].join('')
          if (!this.$apollo.subscriptions[subKey] && this.$apollo.provider.clients[api]) {
            this.logInfo(`Creating GQL Subscription: api: ${api}, message: ${message}, subKey: ${subKey}`)
            // If a callback function has been passed use it as the result processor, otherwise use a default function
            const resultFunction = (callback instanceof Function) ? callback : function (data, key) {
              api = key.replace([message, '_'].join(''), '')
              if (data.data && message in data.data && this[container][api] !== data.data[message]) {
                // Store the message data and set the api state to active
                this[container][api] = data.data[message]
                if (!this.$store.state.apis[api].state && message in data.data) {
                  this.$store.commit('setApiState', { api: api, value: true })
                }
              }
            }
            let subscriptionFields = {
              client: api,
              query: gql,
              manual: true,
              result: resultFunction,
              skip: skip
            }
            // If errorCallback is set, merge into queryFields
            if (errorCallback instanceof Function) {
              this.logInfo('errorCallback')
              subscriptionFields = { ...subscriptionFields, error: errorCallback }
            }
            // If variables is set, merge into queryFields
            if (variables instanceof Object || variables instanceof String) {
              subscriptionFields = { ...subscriptionFields, variables: variables }
            }
            this.$apollo.addSmartSubscription(subKey, subscriptionFields)
          }
        }
      }
    })
  }
}

export const MaverickApi = plugin
