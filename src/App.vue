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
        case /^\/system/.test(this.$store.state.route.path):
          this.$store.commit('core/setModuleName', 'system')
          this.$store.commit('core/setNavDrawerEnable', true)
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
    '$store.state.core.apiState': {
      handler: function (newValue) {
        for (const api of Object.keys(newValue)) {
          // If schema has been fetched, proceed to create Status query/subscription
          if (newValue[api].schemaready === true) {
            this.createQuery('Status', statusQuery, api, null, null, this.processStatusQuery)
            this.createSubscription('Status', statusSubscription, api, null, null, this.processStatusSubscription)
          }
        }
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
    // Set initital dark theme state
    this.$vuetify.theme.dark = this.isDark
    // Create a default discovery agent if one doesn't exist
    this.defaultDiscovery()
    // Create websocket connections for all defined discovery agents
    this.createDiscoveries()
    // Connect to defined APIs
    this.createClients()
  },

  methods: {
    createApi (data) {
      if (!this.apis[data.uuid] && data.service_type == 'maverick-api') {
        this.logInfo(`Creating new API connection from discovered service: ${data.name}`)
        let apidata = {
          authToken: null,
          colorLight: "rgba(166,11,11,0.3)",
          colorDark: "rgba(166,11,11,0.9)",
          httpEndpoint: data.httpEndpoint,
          httpsEndpoint: data.httpsEndpoint ? data.httpsEndpoint : null,
          hostname: data.hostname,
          key: data.uuid,
          name: data.name,
          schemaEndpoint: data.schemaEndpoint,
          schemasEndpoint: data.schemasEndpoint ? data.schemasEndpoint : null,
          wsEndpoint: data.wsEndpoint,
          wssEndpoint: data.wssEndpoint ? data.wssEndpoint : null,
          websocketsOnly: data.websocketsOnly
        }
        this.$store.commit('data/addApi', {key: apidata.key, data: apidata})
        if (this.uiSettings.notifyDiscovery) {
          this.$toast.info(`Created new API connection from discovery: <strong>${data.name}</strong>`)
        }
      }
    },
    checkApis () {
      // If an api hasn't been seen for more than 10 seconds, mark it as dead
      for (const api in this.apis) {
        let lastseen = this.$store.state.core.apiSeen.hasOwnProperty(api) ? this.$store.state.core.apiSeen[api] : 0
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
      }
    },
    createDiscoveries() {
      for (let [key, discovery] of Object.entries(this.$store.state.data.discoveries)) {
        /* Define message callback */
        onmessage = (evt) => {
          try {
            const data = JSON.parse(evt.data)
            if (data.service_type == "maverick-api") {
              this.createApi(data)
            }
            if (data.service_type == "webrtc") {
              this.createVideo(data)
            }
          } catch (error) {
            // console.log("Error: " + error)
          }
        }

        /* Create non-encrypted websocket connection */
        if (window.location.protocol == 'http:') {
          var ws = new WebSocket(discovery.ws_url);
          ws.onopen = () => {
            this.logInfo("Connected to ws maverick-discovery service: " + discovery.ws_url)
          }
          ws.onmessage = onmessage
        } else if (window.location.protocol == 'https:') {
          /* Create encrypted websocket connection */
          var wss = new WebSocket(discovery.wss_url);
          wss.onopen = () => {
            this.logInfo("Connected to wss maverick-discovery service: " + discovery.wss_url)
          }
          wss.onmessage = onmessage
        }
      }
    },
    createVideo (data) {
      if (!this.$store.state.data.videostreams[data.uuid] && data.service_type == 'webrtc') {
        this.logInfo(`Creating new Video stream from discovered service: ${data.name}`)
        let videodata = {
          key: data.uuid,
          name: data.name,
          hostnamne: data.hostanme,
          webrtcEndpoint: data.wsEndpoint,
          enabled: false,
          action: 'start'
        }
        this.$store.commit('data/addVideoStream', {key: videodata.key, data: videodata})
        if (this.uiSettings.notifyDiscovery) {
          this.$toast.info(`Created new Video Stream from discovery: <strong>${data.name}</strong>`)
        }
      }
    },
    defaultDiscovery() {
      if (!this.$store.state.data.discoveries[window.location.hostname]) {
        const ws_url = 'ws://' + window.location.hostname + ':6001'
        const wss_url = 'wss://' + window.location.hostname + ':6002'
        this.logInfo(`Creating default discovery agent: ${ws_url} :: ${wss_url}`)
        this.$store.commit('data/addDiscovery', { key: window.location.hostname, data: { ws_url: ws_url, wss_url: wss_url, host: window.location.hostname } })
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
          // Create a subscription for service updates, but wait 2.5 seconds to skip all the initial updates from MaverickServiceList query
          setTimeout(() => {
            this.createSubscription('MaverickService', maverickServicesSubscription, api, null, null, this.processServiceSubscription)
          }, 5000)
        }
        this.$store.commit('core/setApiSeen', {api: api, lastseen: performance.now() })
        if (!(api in this.$store.state.core.statusData)) {
          this.$store.commit('core/setStatusData', { api: api, message: data.data.Status })
        }
      }
    },
    processStatusSubscription (data, key) {
      const api = key.split('___')[0]
      // Store the message data and set the api state to active, for subsequent subscription callbacks
      // if (data.data && this.$store.state.core.apis[api].state !== true) this.$store.commit('data/setApiState', { api: api, value: true })
      this.$store.commit('core/setApiSeen', {api: api, lastseen: performance.now() })
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
        this.$store.commit('core/setServiceData', { api: api, name: data.data.MaverickService.name, message: data.data.MaverickService })
        if (this.uiSettings.notifyServices) {
          this.$toast.info(`Maverick service <strong>${data.data.MaverickService.displayName}</strong> for connection <strong>${this.apis[api].name}</strong> changed state to Running(<strong>${data.data.MaverickService.running}</strong>), Enabled(<strong>${data.data.MaverickService.enabled}</strong>)`)
        }
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