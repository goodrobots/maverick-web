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

export default {
  name: 'App',
  components: { BottomNav, TopNav, ActionButton },
  data () {
    return {
      epoch: performance.now()
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
          break
        case /^\/planner/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'planner')
          break
        case /^\/config/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'config')
          break
        case /^\/analysis/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'analysis')
          break
        case /^\/test/.test(this.$store.state.route.path):
          this.$store.commit('setModuleName', 'test')
          break
        default:
          this.$store.commit('setModuleName', 'home')
      }
      switch (this.$store.state.moduleName) {
        case 'cockpit':
          this.$store.commit('setNavColor', 'mavblue')
          this.$store.commit('setNavIcon', false)
          break
        case 'planner':
          this.$store.commit('setNavColor', 'mavorange')
          this.$store.commit('setNavIcon', false)
          break
        case 'config':
          this.$store.commit('setNavColor', 'mavpurple')
          this.$store.commit('setNavIcon', true)
          break
        case 'analysis':
          this.$store.commit('setNavColor', 'mavgreen')
          this.$store.commit('setNavIcon', false)
          break
        case 'test':
          this.$store.commit('setNavColor', 'mavpurple')
          this.$store.commit('setNavIcon', false)
          break
        default:
          this.$store.commit('setNavColor', null)
          this.$store.commit('setNavIcon', false)
      }
      return this.$store.state.moduleName
    },
    navState () {
      return this.moduleName === 'home' ? false : this.$store.state.navState // Return false if home screen, otherwise from vuex state
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('Status', statusQuery, api, null, this.processStatusQuery)
          this.createSubscription('Status', statusSubscription, api, null, this.processStatusSubscription)
        }
      },
      deep: true
    }
  },

  created () {
    this.logBanner('** Welcome to Maverick Web GCS **')
  },

  methods: {
    checkApis () {
      // If an api hasn't been seen for more than 10 seconds, mark it as dead
      for (const api in this.apis) {
        if (performance.now() - this.$store.state.apiTimestamps[api] > 10000) {
          console.log(`deadapi? api: ${api}, timestamp: ${this.$store.state.apiTimestamps[api]}`)
          this.$store.commit('setApiState', { api: api, value: false })
        }
      }
    },
    processStatusQuery (data, key) {
      const api = key.replace('Status_', '')
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
      const api = key.replace('Status_', '')
      // Store the message data and set the api state to active, for subsequent subscription callbacks
      if (this.$store.state.apis[api].state !== true) this.$store.commit('setApiState', { api: api, value: true })
      this.$store.commit('setApiSeen', { api: api, value: performance.now() })
      if (this.$store.state.statusData[api] !== data.data.Status) {
        this.$store.commit('setStatusData', { api: api, message: data.data.Status })
      }
    }
  }
}
</script>
