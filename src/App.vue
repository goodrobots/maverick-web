<template lang='pug'>
div#fullscreen
  v-app
    action-button(v-if="this.moduleName !== 'home'")
    top-nav(v-if="navState")
    v-fade-transition(mode="out-in")
      // cache the planner module to prevent from being destroyed on component change
      keep-alive(include="PlannerModule")
        router-view
</template>

<script>
import BottomNav from './components/common/BottomNav'
import TopNav from './components/common/TopNav'
import ActionButton from './components/common/ActionButton'

import { statusQuery, statusSubscription } from './plugins/graphql/gql/Status.gql'
import { vehicleInfoQuery } from './plugins/graphql/gql/VehicleInfo.gql'
import { maverickServiceListQuery } from './plugins/graphql/gql/MaverickServiceList.gql'
import { maverickServicesSubscription } from './plugins/graphql/gql/MaverickService.gql'

export default {
  name: 'App',
  components: { BottomNav, TopNav, ActionButton },
  data () {
    return {
    }
  },

  timers: {
    checkApis: { time: 1000, autostart: true, repeat: true }
  },

  computed: {
    moduleName () {
      switch (true) {
        case /^\/cockpit/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'cockpit')
          this.$store.commit('data/setNavDrawer', false)
          break
        case /^\/planner/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'planner')
          this.$store.commit('data/setNavDrawer', false)
          break
        case /^\/config/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'config')
          this.$store.commit('data/setNavDrawer', true)
          break
        case /^\/analysis/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'analysis')
          this.$store.commit('data/setNavDrawer', false)
          break
        case /^\/maverick/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'maverick')
          this.$store.commit('data/setNavDrawer', false)
          break
        case /^\/video/.test(this.$store.state.route.path):
          this.$store.commit('data/setModuleName', 'video')
          this.$store.commit('data/setNavDrawer', false)
          break
        default:
          this.$store.commit('data/setModuleName', 'home')
          this.$store.commit('data/setNavDrawer', false)
      }
      if (this.$store.state.data.moduleName in this.$store.state.core.modules) {
        this.$store.commit('data/setNavColor', this.$store.state.core.modules[this.$store.state.data.moduleName].color)
      }
      return this.$store.state.data.moduleName
    },
    navState () {
      return this.moduleName === 'home' ? false : this.$store.state.data.navState // Return false if home screen, otherwise from vuex state
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        this.createClients()
      },
      deep: true
    }
  },

  mounted () {
    this.logBanner('** Welcome to Maverick Web GCS **')
    // Try to connect to the default -api client if one doesn't already exist
    this.createClients()
  },

  methods: {
    checkApis () {
      // If an api hasn't been seen for more than 10 seconds, mark it as dead
      for (const api in this.apis) {
        let lastseen = (this.apistate && this.apistate.hasOwnProperty(api)) ? this.apistate[api].lastseen : 0
        if (this.appVisible && performance.now() - lastseen > 10000) {
          // this.logInfo(`deadapi? api: ${api}, timestamp: ${lastseen}`)
          this.$store.commit('core/setApiState', { api: api, field: 'state', value: false })
        }
      }
    },
    createClients() {
      // If there are any defined apis that don't have a corresponding client, create one
      for (const api in this.apis) {
        if (!this.$apollo.provider.clients.hasOwnProperty(api)) {
          this.createClient(api, this.apis[api])
        }
        this.createQuery('Status', statusQuery, api, null, null, this.processStatusQuery)
        this.createSubscription('Status', statusSubscription, api, null, null, this.processStatusSubscription)
      }
    },
    /*
    createDefaultClient() {
      // Create a default client if it doesn't already exist
      const hostname = window.location.hostname
      const protocol = window.location.protocol
      const wsprotocol = (protocol.includes("https")) ? 'wss:' : 'ws:'
      // Port 6800 is the default Flight Controller -api port in Maverick environment4
      const apiport = 6800
      this.logDebug(`Creating default client:: hostname: ${hostname}, protocol: ${protocol}, wsprotocol: ${wsprotocol}`)
      const clientData = {
        "httpEndpoint": `${protocol}//${hostname}:${apiport}/graphql`,
        "wsEndpoint": `${wsprotocol}//${hostname}:${apiport}/subscriptions`,
        "schemaEndpoint": `${protocol}//${hostname}:${apiport}/schema`,
        "websocketsOnly": false,
        "name": "Default API",
        "colorLight": "rgba(166,11,11,0.3)",
        "colorDark": "rgba(166,11,11,0.9)",
        "authToken": null
      }

      // If our persistent storage already has a definition for default, use it
      if (this.apis['default']) {
        this.createClient('default', this.apis['default'])
      // Otherwise use the defaults
      } else {
        this.createClient('default', clientData)
      }
    },
    */
    processStatusQuery (data, key) {
      const api = key.split('___')[0]
      if (data.data && 'Status' in data.data) {
        // Store the message data and set the api state to active, only for the first callback
        if (this.apistate[api].state !== true) this.$store.commit('core/setApiState', { api: api, field: 'state', value: true })
        // If the uuid for the api has not already been set, set it and create a VehicleInfo query (which needs the uuid to be created)
        if (!this.apistate[api].uuid) {
          this.$store.commit('core/setApiUuid', { api: api, value: data.data.Status.id })
        }
        // If the VehicleInfo query doesn't already exist for this client, create it
        if (!(api + '___VehicleInfo___' in this.$apollo.queries)) {
          if (this.verifyQuery(vehicleInfoQuery, api)) {
            this.createQuery('VehicleInfo', vehicleInfoQuery, api, null, !this.verifyQuery(vehicleInfoQuery, api), this.processVehicleInfoQuery, null, { uuid: this.apis[api].uuid })
          }
        }
        // If the MaverickServiceList query doesn't already exist for this client, create it
        if (!(api + '___MaverickServiceList___' in this.$apollo.queries)) {
          this.createQuery('MaverickServiceList', maverickServiceListQuery, api, null, null, this.processServiceListQuery)
          this.createSubscription('MaverickService', maverickServicesSubscription, api, null, null, this.processServiceSubscription)
        }
        if (this.apistate[api].lastseen === null) this.$store.commit('core/setApiState', {api: api, field: 'lastseen', value: performance.now() })
        if (!(api in this.$store.state.core.statusData)) {
          this.$store.commit('core/setStatusData', { api: api, message: data.data.Status })
        }
      }
    },
    processStatusSubscription (data, key) {
      const api = key.split('___')[0]
      // Store the message data and set the api state to active, for subsequent subscription callbacks
      // if (data.data && this.$store.state.core.apis[api].state !== true) this.$store.commit('data/setApiState', { api: api, value: true })
      // this.$store.commit('core/setApiSeen', { api: api, value: performance.now() })
      this.$store.commit('core/setApiState', {api: api, field: 'lastseen', value: performance.now()})
      if (data.data && this.$store.state.core.statusData[api] !== data.data.Status) {
        this.$store.commit('core/setStatusData', { api: api, message: data.data.Status })
      }
    },
    processServiceListQuery (data, key) {
      const api = key.split('___')[0]
      if (data.data && 'MaverickServiceList' in data.data) {
        data.data.MaverickServiceList.services.forEach(element => {
          this.$store.commit('core/setServiceData', { api: api, name: element.name, message: element })
        })
      }
    },
    processServiceSubscription (data, key) {
      const api = key.split('___')[0]
      if (data.data && 'MaverickService' in data.data) {
        // this.logDebug(data.data.MaverickService)
        this.$store.commit('core/setServiceData', { api: api, name: data.data.MaverickService.name, message: data.data.MaverickService })
      }
    },
    processVehicleInfoQuery (data, key) {
      const api = key.split('___')[0]
      if (!data.data) {
        this.logInfo(`Invalid GraphQL 'VehicleInfo' data returned from api: ${api}`)
        this.$store.commit('core/setApiState', { api: api, field: 'state', value: false })
        this.$store.commit('core/setVehicleData', { api: api, message: null })
        return false
      }
      if (this.$store.state.core.vehicleData[api] !== data.data.VehicleInfo) {
        this.$store.commit('core/setVehicleData', { api: api, message: data.data.VehicleInfo })
      }
      if (!this.apis[api].icon) {
        this.$store.commit('data/setApiIcon', { api: api, value: this.vehicleIcon(data.data.VehicleInfo.typeString) })
      }
    }
  }
}
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>