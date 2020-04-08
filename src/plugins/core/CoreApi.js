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
          return this.$store.state.data.activeApi
        },
        darkUi () {
          return this.$store.state.data.darkUi
        },
        isDark () {
          // autodark setting overrides manual dark setting
          if (this.uiSettings.autoDark) {
            return this.$mq.isDark
          } else {
            return this.uiSettings.dark
          }
        },
        moduleName () {
          return this.$store.state.core.moduleName
        },
        navColor () {
          return this.$store.state.core.navColor
        },
        navIcon () {
          return this.$store.state.core.modules[this.moduleName].icon
        },
        navDrawer () {
          return this.$store.state.core.navDrawer
        },
        navDrawerEnable () {
          return this.$store.state.core.navDrawerEnable
        },
        topColor () {
          if (this.uiSettings.colorBg === true) {
            return (this.isDark) ? `${this.navColor} darken-3` : `${this.navColor} lighten-4`
          } else {
            return (this.isDark) ? 'grey darken-4' : 'grey lighten-4'
          }
        },
        uiSettings () {
          return this.$store.state.data.uiSettings
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

        // TODO: This method name clashes with graphql createClient, should be renamed
        async createClient (api, clientdata) {
          // Add a vuex apis entry
          this.$store.commit('core/addApiState', api)

          if (!this.apis[api].hostname) {
            this.logError(`Error: API ${this.apis[api].name} does not have a hostname set, please upgrade maverick-api`)
            return false
          }
          // Check ssl connection
          let httpsState = false
          let httpsLoad = this.testImage(`https://${this.apis[api].hostname}/img/ssl/ssltest.png`)
            .then(img => { httpsState = true })
            .catch(err => { httpsState = false })
          await httpsLoad      
          this.$store.commit('core/setApiState', {api: api, field: 'sslstate', value: httpsState})
          this.logDebug(`SSL test for API host ${this.apis[api].hostname} result: ${httpsState}`)

          // Add an apollo client
          let client = null
          let schemaFetchPromise = null
          if (window.location.protocol == 'https:') {
            if (clientdata.httpsEndpoint && clientdata.wssEndpoint && clientdata.schemasEndpoint) {
              if (httpsState === false) {
                this.logError(`SSL test for API host ${this.apis[api].hostname} failed, not creating API client`)
                return false
              }
              // Try to create client
              client = createClient({
                httpEndpoint: clientdata.httpsEndpoint,
                wsEndpoint: clientdata.wssEndpoint,
                websocketsOnly: clientdata.websocketsOnly
              })
              // Fetch and parse the client schema
              schemaFetchPromise = new Promise((resolve, reject) => {
                this.fetchClientSchema(api, clientdata).then(() => {
                  resolve()
                })
              })
            } else {
              this.logError(`API client ${this.apis[api].name} does not have SSL endpoints set, and this is an https connection`)
              return false
            }
          } else {
            client = createClient({
              httpEndpoint: clientdata.httpEndpoint,
              wsEndpoint: clientdata.wsEndpoint,
              websocketsOnly: clientdata.websocketsOnly
            })
            // Fetch and parse the client schema
            schemaFetchPromise = new Promise((resolve, reject) => {
              this.fetchClientSchema(api, clientdata).then(() => {
                resolve()
              })
            })
          }
          this.$set(this.$apollo.provider.clients, api, client)
          // Set the client auth token
          if (clientdata.authToken) {
            this.logDebug(`Setting auth token: ${clientdata.authToken}`)
            onLogin(client, clientdata.authToken, api, this.$store)
          }
          // Wait for the fetch to resolve before setting the api state
          await schemaFetchPromise
          this.logDebug(`Completed schema fetch for API ${this.apis[api].name}`)
          this.$store.commit('core/setApiState', {api: api, field: 'schemaready', value: true})
        },

        createQuery (message, gql, api, container, skip = false, callback = null, errorCallback = null, variables = null) {
          // Generate query key
          const varvalues = variables && Object.values(variables) ? Object.values(variables).join('~') : ''
          const queryKey = [api, message, varvalues].join('___')
          // If a query with the calculated key doesn't exist, and the client appears to exist, then create the query
          if (!this.$apollo.queries[queryKey] && this.$apollo.provider.clients[api]) {
            this.logDebug(`Creating GQL Query: api: ${this.apis[api].name}, message: ${message}, queryKey: ${queryKey}, container: ${container}`)
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
            this.logDebug(`Creating GQL Subscription: api: ${this.apis[api].name}, message: ${message}, subKey: ${subKey}`)
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

        async fetchClientSchema (api, clientdata) {
          const schemaEndpoint = window.location.protocol == 'https:' ? clientdata.schemasEndpoint : clientdata.schemaEndpoint
          await this.$store.dispatch("core/fetchSchema", {api: api, schemaEndpoint: schemaEndpoint}).then(() => {
            this.logDebug('Schema fetch has been dispatched: ' + schemaEndpoint)
          })
        },

        hashCode(s) {
          let h
          for(let i = 0; i < s.length; i++) 
                h = Math.imul(31, h) + s.charCodeAt(i) | 0
          return h.toString()
        },

        isApiReady (api) {
          try {
            return this.apistate[api].state === true && this.apistate[api].schemaready === true
          } catch {
            return false
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
            // this.logDebug(data)
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

        // Define a promise that fetches the image and watches for completion or error
        testImage(imgPath) {
          return new Promise((resolve, reject) => {
            const testImg = new Image()
            testImg.addEventListener("load", () => resolve(testImg))
            testImg.addEventListener("error", err => reject(err))
            testImg.src = imgPath
          })
        },

        tickCross (boolean) {
          if (boolean) {
            return "v-icon(color='green') mdi-check-circle-outline"
          } else {
            return "v-icon(color='red') mdi-alert-circle-outline"
          }
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
        }
      }
    })
  }
}

export const CoreApi = plugin
