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
        default:
          this.$store.commit('setNavIcon', false)
          this.$store.commit('setModuleName', 'home')
      }
      this.$store.commit('setNavColor', this.$store.state.moduleData[this.$store.state.moduleName].color)
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
        for (const api in this.apis) {
          this.createQuery('Status', statusQuery, api, null, this.processStatusQuery)
          this.createSubscription('Status', statusSubscription, api, null, this.processStatusSubscription)
          this.createQuery('VehicleInfo', vehicleInfoQuery, api, null, this.processVehicleInfoQuery, null, null, { uuid: '' })
        }
      },
      deep: true
    }
  },

  mounted () {
    this.logBanner('** Welcome to Maverick Web GCS **')
  },

  methods: {
    checkApis () {
      // If an api hasn't been seen for more than 10 seconds, mark it as dead
      for (const api in this.apis) {
        if (this.appVisible && performance.now() - this.$store.state.apiTimestamps[api] > 10000) {
          console.log(`deadapi? api: ${api}, timestamp: ${this.$store.state.apiTimestamps[api]}`)
          this.$store.commit('setApiState', { api: api, value: false })
        }
      }
    },
    processStatusQuery (data, key) {
      const api = key.split('___')[0]
      if (data.data && 'Status' in data.data) {
        // Store the message data and set the api state to active, only for the first callback
        if (this.$store.state.apis[api].state !== true) this.$store.commit('setApiState', { api: api, value: true })
        if (this.$store.state.apiTimestamps[api] === null) this.$store.commit('setApiSeen', { api: api, value: performance.now() })
        if (!(api in this.$store.state.statusData)) {
          this.$store.commit('setStatusData', { api: api, message: data.data.Status })
        }
      }
    },
    processStatusSubscription (data, key) {
      const api = key.split('___')[0]
      // Store the message data and set the api state to active, for subsequent subscription callbacks
      if (this.$store.state.apis[api].state !== true) this.$store.commit('setApiState', { api: api, value: true })
      this.$store.commit('setApiSeen', { api: api, value: performance.now() })
      if (this.$store.state.statusData[api] !== data.data.Status) {
        this.$store.commit('setStatusData', { api: api, message: data.data.Status })
      }
    },
    processVehicleInfoQuery (data, key) {
      const api = key.split('___')[0]
      if (this.$store.state.vehicleData[api] !== data.data.VehicleInfo) {
        this.$store.commit('setVehicleData', { api: api, message: data.data.VehicleInfo })
      }
      if (!this.apis[api].icon) {
        this.$store.commit('setApiIcon', { api: api, value: this.vehicleIcon(data.data.VehicleInfo.typeString) })
      }
    }
  }
}
</script>
