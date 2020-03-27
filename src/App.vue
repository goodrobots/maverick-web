<template lang='pug'>
div#fullscreen
  v-app
    action-button(v-if="moduleName !== 'home'")
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

import colors from 'vuetify/lib/util/colors'

import io from "socket.io-client";

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
          this.$store.commit('core/setModuleName', 'cockpit')
          this.$store.commit('core/setNavDrawerEnable', false)
          break
        case /^\/planner/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'planner')
          this.$store.commit('core/setNavDrawerEnable', false)
          break
        case /^\/config/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'config')
          this.$store.commit('core/setNavDrawerEnable', true)
          break
        case /^\/analysis/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'analysis')
          this.$store.commit('core/setNavDrawerEnable', false)
          break
        case /^\/maverick/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'maverick')
          this.$store.commit('core/setNavDrawerEnable', false)
          break
        case /^\/video/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'video')
          this.$store.commit('core/setNavDrawerEnable', true)
          break
        default:
          this.$store.commit('core/setModuleName', 'home')
          this.$store.commit('core/setNavDrawerEnable', false)
      }
      if (this.$store.state.core.moduleName in this.$store.state.core.modules) {
        this.$store.commit('core/setNavColor', this.$store.state.core.modules[this.$store.state.core.moduleName].color)
      }
      return this.$store.state.core.moduleName
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
    },
    // Watch discoveries state for any change and process
    '$store.state.data.discoveries': {
      handler: function (newValue) {
        this.createDiscoveries()
      },
      deep: true
    },
    isDark (newvalue) {
      this.$vuetify.theme.dark = newvalue
    },
    '$store.state.core.navColor' (newvalue) {
      let _color = newvalue
      if (newvalue == 'deep-purple') {
        _color = 'deepPurple'
      } else if (newvalue == 'light-blue') {
        _color = 'lightBlue'
      } else if (newvalue == 'light-green') {
        _color = 'lightGreen'
      } else if (newvalue == 'deep-orange') {
        _color = 'deepOrange'
      } else if (newvalue == 'blue-grey') {
        _color = 'blueGrey'
      }
      this.$vuetify.theme.themes.light.primary = colors[_color].lighten2
      this.$vuetify.theme.themes.dark.primary = colors[_color].base
    }
  },

  mounted () {
    this.logBanner('** Welcome to Maverick Web GCS **')
    // Connect to defined APIs
    this.createClients()
    // Create a default discovery agent if one doesn't exist
    this.defaultDiscovery()
    // Create websocket connections for all defined discovery agents
    this.createDiscoveries()
    // Set initital dark theme state
    this.logDebug()
    this.$vuetify.theme.dark = this.isDark
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
      // Connect to all defined apis, and create basic Status query/subscription
      for (const api in this.apis) {
        if (!this.$apollo.provider.clients.hasOwnProperty(api)) {
          this.createClient(api, this.apis[api])
        }
        this.createQuery('Status', statusQuery, api, null, null, this.processStatusQuery)
        this.createSubscription('Status', statusSubscription, api, null, null, this.processStatusSubscription)
      }
    },
    defaultDiscovery() {
      if (!this.$store.state.data.discoveries[window.location.hostname]) {
        const url = 'ws://' + window.location.hostname + ':1234'
        this.logInfo(`Creating default discovery agent: ${url}`)
        this.$store.commit('data/addDiscovery', { key: window.location.hostname, data: { url: url, host: window.location.hostname, port: 1234 } })
      }
    },
    createDiscoveries() {
      for (let [key, discovery] of Object.entries(this.$store.state.data.discoveries)) {
        var ws = new WebSocket(discovery.url);
        ws.onopen = () => {
          this.logInfo("Connected to discovery service: " + discovery.url)
        }
        ws.onmessage = (evt) => {
          const data = JSON.parse(evt.data)
          // this.logDebug(`Received new discovered service: ${data.name}`)
          if (data.service_type == "maverick-api") {
            this.createApi(data)
          }
          if (data.service_type == "webrtc") {
            this.createVideo(data)
          }
        }
      }
    },
    createApi (data) {
      if (!this.apis[data.uuid] && data.service_type == 'maverick-api') {
        this.logInfo(`Creating new API connection from discovered service: ${data.name}`)
        let apidata = {
          key: data.uuid,
          "httpEndpoint": data.httpEndpoint,
          "wsEndpoint": data.wsEndpoint,
          "schemaEndpoint": data.schemaEndpoint,
          "websocketsOnly": data.websocketsOnly,
          "name": data.name,
          "colorLight": "rgba(166,11,11,0.3)",
          "colorDark": "rgba(166,11,11,0.9)",
          "authToken": null
        }
        this.$store.commit('data/addApi', {key: apidata.key, data: apidata})
        this.$toast.info(`Created new API connection from discovery: <strong>${data.name}</strong>`)
      }
    },
    createVideo (data) {
      if (!this.$store.state.data.videostreams[data.uuid] && data.service_type == 'webrtc') {
        this.logInfo(`Creating new Video stream from discovered service: ${data.name}`)
        let videodata = {
          key: data.uuid,
          name: data.name,
          webrtcEndpoint: data.wsEndpoint,
          enabled: false,
          action: 'start'
        }
        this.$store.commit('data/addVideoStream', {key: videodata.key, data: videodata})
        this.$toast.info(`Created new Video Stream from discovery: <strong>${data.name}</strong>`)
      }
    },

    /*
     processX() are async callbacks that process incoming GQL messages
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