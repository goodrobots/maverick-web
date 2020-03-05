import { validate } from 'graphql/validation'
import { print } from 'graphql/language/printer'
import { createClient, onLogin } from '../graphql/apollo-functions'

const plugin = {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Installing CoreApi plugin') // eslint-disable-line no-console
    }

    Vue.mixin({

      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },

      data () {
        return {
        }
      },

      computed: {
        apis () {
          return this.$store.state.data.apis
        },
        apistate() {
          return this.$store.state.core.apiState
        },
        activeApi () {
          return this.$store.state.core.activeApi
        },
        darkUi () {
          return this.$store.state.data.darkUi
        },
        moduleName () {
          return this.$store.state.data.moduleName
        },
        navColor () {
          return this.$store.state.data.navColor
        },
        navIcon () {
          return this.$store.state.data.modules[this.moduleName].icon
        },
        navDrawer () {
          return this.$store.state.data.navDrawer
        },
        vehicleData () {
          return this.$store.state.core.vehicleData
        }
      },

      watch: {
        appVisible (newValue) {
          if (newValue && this.$apollo) {
            this.logInfo('App Visibility changed to Visible, turning on all GraphQL queries')
            this.$apollo.skipAll = false
          } else if (this.$apollo) {
            this.logInfo('App Visibility changed to Invisible, turning off all GraphQL queries')
            this.$apollo.skipAll = true
          }
        }
      },

      mounted () {
        // Only execute this if root component, otherwise skip it.
        // Theoretically, this should execute once after the main Vue component is loaded,
        //  and the apollo plugin and provider has loaded.
        if (!this.$parent && this.$apollo.provider) {
          // this.logInfo('Root component mounted')
        }
      },

      methods: {
        clearAllVerifiedQueries() {
          for (const api in this.apis) {
            this.clearVerifiedQueries(api)
          }
        },

        clearVerifiedQueries(api) {
          this.$store.commit('core/clearGraphqlVerified', api)
        },

        isApiReady (api) {
          try {
            return this.apistate[api].state === true && this.apistate[api].schemaready === true
          } catch {
            return false
          }
        },

        verifyQuery (gql, api = this.activeApi, unknownDefault = false) {
          let gqlHash = this.hashCode(print(gql))
          let alreadyVerified = this.$store.getters['core/graphqlSchemaVerified'](api, gqlHash)

          if (alreadyVerified !== undefined) {
            // query has already been verified for this api
            return alreadyVerified
          }

          // attempt to validate the query 
          let graphqlSchema = this.$store.getters['core/graphqlSchema'](api)
          if (graphqlSchema === undefined) {
            // graphqlSchema has not been fetched for this api, return unknownDefault
            return unknownDefault
          }
          // this.logDebug(graphqlSchema)
          let validationErrors = undefined
          try {
            validationErrors = validate(graphqlSchema, gql)
          } catch (err) {
            this.logDebug(`Validation error: ${err}`)
            return unknownDefault
          }
          let valid = false
          if (validationErrors == undefined || validationErrors.length == 0) {
            valid = true
          }
          this.$store.commit('core/updateGraphqlVerified', {api:api, hash:gqlHash, ret:valid})
          return valid
        },

        hashCode(s) {
          let h
          for(let i = 0; i < s.length; i++) 
                h = Math.imul(31, h) + s.charCodeAt(i) | 0
          return h.toString()
        },

        async fetchClientSchema (api, clientdata) {
          await this.$store.dispatch("core/fetchSchema", {api:api, schemaEndpoint:clientdata.schemaEndpoint}).then(() => {
            this.logDebug('Schema fetch has been dispatched for api: ' + api)
          })
        },

        async createClient (api, clientdata) {
          // Add a vuex apis entry
          this.$store.commit('core/addApiState', api)
          // Fetch and parse the client schema
          let schemaFetchPromise = new Promise((resolve, reject) => {
            this.fetchClientSchema(api, clientdata).then(() => {
              resolve()
            })
          })
          // While the above is resolving, do as much as possible...
          // Add an apollo client
          const client = createClient({
            httpEndpoint: clientdata.httpEndpoint,
            wsEndpoint: clientdata.wsEndpoint,
            websocketsOnly: clientdata.websocketsOnly
          })
          this.$set(this.$apollo.provider.clients, api, client)
          // Set the client auth token
          if (clientdata.authToken) {
            this.logDebug(`Setting auth token: ${clientdata.authToken}`)
            onLogin(client, clientdata.authToken, api, this.$store)
          }
          // Wait for the fetch to resolve before setting the api state
          await schemaFetchPromise
          this.$store.commit('core/setApiState', {api: api, field: 'schemaready', value: true})
        },

        createQuery (message, gql, api, container, skip = false, callback = null, errorCallback = null, variables = null) {
          // Generate query key
          const varvalues = variables && Object.values(variables) ? Object.values(variables).join('~') : ''
          const queryKey = [api, message, varvalues].join('___')
          // If a query with the calculated key doesn't exist, and the client appears to exist, then create the query
          if (!this.$apollo.queries[queryKey] && this.$apollo.provider.clients[api]) {
            this.logDebug(`Creating GQL Query: api: ${api}, message: ${message}, queryKey: ${queryKey}, container: ${container}`)
            // If a callback function has been passed use it as the result processor, otherwise use a default function
            const resultFunction = (callback instanceof Function) ? callback : function (data, key) {
              const cbapi = key.split('___')[0]
              if (data.data && message in data.data) {
                // Store the message data and set the api state to active
                // Note: Must use this.$set to add object property, to keep new property reactive
                this.$set(this[container], cbapi, data.data[message])
                this.$store.commit('core/setApiState', { api: cbapi, field: 'state', value: true })
              }
            }
            let queryFields = {
              client: api,
              query: gql,
              manual: true,
              result: resultFunction,
              skip: skip,
              deep: true
            }
            // If errorCallback is set, merge into queryFields
            if (errorCallback instanceof Function) {
              queryFields = { ...queryFields, error: errorCallback }
            }
            // If variables is set, merge into queryFields
            if (variables instanceof Object || variables instanceof String) {
              queryFields = { ...queryFields, variables () { return variables } }
            }
            this.$apollo.addSmartQuery(queryKey, queryFields)
          }
        },

        createSubscription (message, gql, api, container, skip = false, callback = null, errorCallback = null, variables = null) {
          // Generate subscription key
          const varvalues = variables && Object.values(variables) ? Object.values(variables).join('~') : ''
          const subKey = [api, message, varvalues].join('___')
          if (!this.$apollo.subscriptions[subKey] && this.$apollo.provider.clients[api]) {
            this.logDebug(`Creating GQL Subscription: api: ${api}, message: ${message}, subKey: ${subKey}`)
            // If a callback function has been passed use it as the result processor, otherwise use a default function
            const resultFunction = (callback instanceof Function) ? callback : function (data, key) {
              const cbapi = key.split('___')[0]
              if (data.data && message in data.data && this[container][cbapi] !== data.data[message]) {
                // Store the message data and set the api state to active
                this[container][cbapi] = data.data[message]
                if (this.$store && this.apis[cbapi] && !this.apis[cbapi].state && message in data.data) {
                  this.$store.commit('core/setApiState', { api: cbapi, field: 'state', value: true })
                }
              }
            }
            let subscriptionFields = {
              client: api,
              query: gql,
              manual: true,
              result: resultFunction,
              skip: skip,
              deep: true
            }
            // If errorCallback is set, merge into queryFields
            if (errorCallback instanceof Function) {
              this.logInfo('errorCallback')
              subscriptionFields = { ...subscriptionFields, error: errorCallback }
            }
            // If variables is set, merge into queryFields
            if (variables instanceof Object || variables instanceof String) {
              subscriptionFields = { ...subscriptionFields, variables () { return variables } }
            }
            this.$apollo.addSmartSubscription(subKey, subscriptionFields)
          }
        },

        mutateQuery (api, query, variables) {
          let mutateFields = {
            client: api,
            mutation: query,
            variables: variables
          }
          this.$apollo.mutate(
            mutateFields
          ).then((data) => {
            this.logDebug(data)
          }).catch((error) => {
            this.logError(error)
          })
          /*
          update: (store, { data: { updateMission } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: TAGS_QUERY })
            // Add our tag from the mutation to the end
            data.tags.push(addTag)
            // Write our data back to the cache.
            store.writeQuery({ query: TAGS_QUERY, data })
          }
          */
          /*
          // Optimistic UI
          // Will be treated as a 'fake' result as soon as the request is made
          // so that the UI can react quickly and the user be happy
          optimisticResponse: {
            __typename: 'Mutation',
            addTag: {
              __typename: 'Tag',
              id: -1,
              label: newTag,
            },
          },
          */
        },

        vehicleIcon (vehicleType) {
          const iconPath = 'img/icons/vehicleIcons/'
          if (vehicleType === 'Copter' || vehicleType === 'Quadrotor') {
            return iconPath + 'quadcopter.svg'
          } else if (vehicleType === 'Plane') {
            return iconPath + '035-airplane-1.svg'
          } else if (vehicleType === 'ArduSub') {
            return iconPath + '008-submarine-1.svg'
          } else if (vehicleType === 'Heli') {
            return iconPath + '060-helicopter.svg'
          } else if (vehicleType === 'Rover') {
            return iconPath + '078-car-3.svg'
          } else if (vehicleType === 'Boat') {
            return iconPath + '096-boat.svg'
          } else {
            return null
          }
        },

        tickCross (boolean) {
          if (boolean) {
            return "v-icon(color='green') mdi-check-circle-outline"
          } else {
            return "v-icon(color='red') mdi-alert-circle-outline"
          }
        }
      }
    })
  }
}

export const CoreApi = plugin
