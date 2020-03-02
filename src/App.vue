<template lang='pug'>
div#fullscreen
  v-app(:dark="darkUi")
    top-nav(v-if="navState")
    v-fade-transition(mode="out-in")
      // cache the planner module to prevent from being destroyed on component change
      keep-alive(include="PlannerModule")
        router-view
  action-button(v-if="this.moduleName !== 'home'" :dark="darkUi")
</template>

<script>
import BottomNav from './components/common/BottomNav'
import TopNav from './components/common/TopNav'
import ActionButton from './components/common/ActionButton'

import { statusQuery, statusSubscription } from './plugins/graphql/gql/Status.gql'
import { vehicleInfoQuery } from './plugins/graphql/gql/VehicleInfo.gql'

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
    darkUi () {
      return this.$store.state.darkUi
    },
    moduleName () {
      switch (true) {
        case /^\/cockpit/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'cockpit')
          this.$store.commit('setNavIcon', false)
          break
        case /^\/planner/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'planner')
          this.$store.commit('setNavIcon', false)
          break
        case /^\/config/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'config')
          this.$store.commit('setNavIcon', true)
          break
        case /^\/analysis/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'analysis')
          this.$store.commit('setNavIcon', false)
          break
        case /^\/test/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'test')
          this.$store.commit('setNavIcon', false)
          break
        case /^\/maverick/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'maverick')
          this.$store.commit('setNavIcon', false)
          break
        case /^\/video/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'video')
          this.$store.commit('setNavIcon', false)
          break
        default:
          this.$store.commit('setNavIcon', false)
          this.$store.commit('setModuleName', 'home')
      }
      if (this.$store.state.moduleName in this.$store.state.moduleData) {
        this.$store.commit('setNavColor', this.$store.state.moduleData[this.$store.state.moduleName].color)
      }
      return this.$store.state.moduleName
    },
    navState () {
      return this.moduleName === 'home' || this.moduleName === 'test' ? false : this.$store.state.navState // Return false if home screen, otherwise from vuex state
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        /*
        // If any of the endpoints have changed, destroy and recreate the client
        // this.deleteQueries(apiData.key)
        delete this.$apollo.provider.clients[apiData.key]
        this.createClient(apiData.key+'new', apiData)
        */
        for (const api in this.apis) {
          this.createQuery('Status', statusQuery, api, null, null, this.processStatusQuery)
          this.createSubscription('Status', statusSubscription, api, null, null, this.processStatusSubscription)
        }
      },
      deep: true
    }
  },

  mounted () {
    this.logBanner('** Welcome to Maverick Web GCS **')
    // Try to connect to the default -api client
    this.createDefaultClient()
  },

  methods: {
    checkApis () {
      // If an api hasn't been seen for more than 10 seconds, mark it as dead
      for (const api in this.apis) {
        if (this.appVisible && performance.now() - this.$store.state.core.apiTimestamps[api] > 10000) {
          this.logInfo(`deadapi? api: ${api}, timestamp: ${this.$store.state.core.apiTimestamps[api]}`)
          this.$store.commit('core/setApiState', { api: api, value: false })
        }
      }
    },
    createDefaultClient() {
      // Port 6800 is the default Flight Controller -api port in Maverick environment4
      const hostname = window.location.hostname
      const protocol = window.location.protocol
      const wsprotocol = (protocol.includes("https")) ? 'wss:' : 'ws:'
      const apiport = 7000
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
      this.createClient('default', clientData)
    },
    processStatusQuery (data, key) {
      const api = key.split('___')[0]
      if (data.data && 'Status' in data.data) {
        // Store the message data and set the api state to active, only for the first callback
        if (this.$store.state.core.apis[api].state !== true) this.$store.commit('core/setApiState', { api: api, value: true })
        // If the uuid for the api has not already been set, set it and create a VehicleInfo query (which needs the uuid to be created)
        if (!this.$store.state.core.apis[api].uuid) {
          this.$store.commit('core/setApiUuid', { api: api, value: data.data.Status.id })
          this.createQuery('VehicleInfo', vehicleInfoQuery, api, null, null, this.processVehicleInfoQuery, null, { uuid: this.$store.state.core.apis[api].uuid })          
        }
        if (this.$store.state.core.apiTimestamps[api] === null) this.$store.commit('core/setApiSeen', { api: api, value: performance.now() })
        if (!(api in this.$store.state.core.statusData)) {
          this.$store.commit('core/setStatusData', { api: api, message: data.data.Status })
        }
      }
    },
    processStatusSubscription (data, key) {
      const api = key.split('___')[0]
      // Store the message data and set the api state to active, for subsequent subscription callbacks
      // if (data.data && this.$store.state.core.apis[api].state !== true) this.$store.commit('core/setApiState', { api: api, value: true })
      this.$store.commit('core/setApiSeen', { api: api, value: performance.now() })
      if (data.data && this.$store.state.core.statusData[api] !== data.data.Status) {
        this.$store.commit('core/setStatusData', { api: api, message: data.data.Status })
      }
    },
    processVehicleInfoQuery (data, key) {
      const api = key.split('___')[0]
      if (!data.data) {
        this.logInfo(`Invalid GraphQL 'VehicleInfo' data returned from api: ${api}`)
        this.$store.commit('core/setApiState', { api: api, value: false })
        this.$store.commit('core/setVehicleData', { api: api, message: null })
        return false
      }
      if (this.$store.state.vehicleData[api] !== data.data.VehicleInfo) {
        this.$store.commit('core/setVehicleData', { api: api, message: data.data.VehicleInfo })
      }
      if (!this.apis[api].icon) {
        this.$store.commit('core/setApiIcon', { api: api, value: this.vehicleIcon(data.data.VehicleInfo.typeString) })
      }
    }
  }
}
</script>
