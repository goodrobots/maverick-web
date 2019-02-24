<template lang='pug'>
div
  transition(name="slide-y-transition" mode="out-in")
    v-toolbar(app fixed dense flat clipped-left color="mavgrey darken-4" :height=48)
      v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" flat left small to="/"): img(:src="publicPath + 'img/logos/maverick-logo-white.svg'" height='35px')
      v-spacer
      v-toolbar-items
        // StatusText Messages
        transition(name="fade-transition" mode="out-in")
          v-menu(offset-y v-if="activeApi && statusTextData[activeApi] && statusTextData[activeApi].length > 0" :max-height="height - 100")
            v-btn(flat slot="activator")
              v-icon warning
            v-list(two-line subheader dense)
              v-subheader Messages
                v-btn(outline small @click="statusTextData[activeApi] = []") Clear
              v-list-tile(v-for="(message, index) in statusTextData[activeApi]" :key="index")
                v-list-tile-content(v-if="message")
                  v-list-tile-title(v-text="message.message")
                  v-list-tile-sub-title(v-text="(fcTime - message.secs > 60) ? Math.round((fcTime - message.secs) / 60) + ' minutes ago' : fcTime - message.secs + ' seconds ago'")
        // Armed/Disarmed button
        v-btn(v-if="vehicleStateData[activeApi] && vehicleStateData[activeApi].armed" color="yellow" flat) ARMED
        v-btn.transparent(v-else-if="vehicleStateData[activeApi]" flat ripple=false) DISARMED
        // Mode button
        v-menu(v-if="vehicleStateData[activeApi]" offset-y transition="scale-transition" :max-height="height - 100")
          v-btn(flat slot="activator" v-text="vehicleStateData[activeApi].mode")
          v-list
            v-list-tile(v-for="(mode, ix) in mavlinkGroup(vehicleModeGroup)" :key="ix" @click="changeMode(ix)")
              v-list-tile-title {{ mode.name }}
        // Altitude button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].altitude" v-html="'Alt<br>' + vfrHudData[activeApi].altitude.toFixed(2) + 'm'" flat ripple=false)
        // Heading button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].heading && !$vuetify.breakpoint.smAndDown" v-html="'Hdg<br>' + vfrHudData[activeApi].heading" flat ripple=false)
        // Speed button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].groundspeed && !$vuetify.breakpoint.smAndDown" v-html="'Spd<br>' + vfrHudData[activeApi].groundspeed.toFixed(2)" flat ripple=false)
      v-spacer

      v-toolbar-items
        v-menu(offset-y transition="scale-transition" left=true)
          v-btn(v-if="activeApi" flat slot="activator" v-text="apis[activeApi]['name']")
          v-btn.text--blue-grey.lighten-5(v-else flat slot="activator") No Active API
          v-list
            v-list-tile(avatar v-for="(data, key) in vehicleData" :key="key" @click='changeApi(key)')
              v-list-tile-avatar
                v-img(v-if="apis[key] && apis[key].icon" :src="publicPath + apis[key].icon" contain=true)
              v-list-tile-content
                v-list-tile-title {{ apis[key].name }}
                v-list-tile-sub-title
                  template(v-if="apis[key].state")
                    div
                      v-icon(color='success' small) check_circle
                      span &nbsp; Good Link
                  template(v-else-if="!apis[key].state")
                    div
                      v-icon(color='error' small) block
                      span &nbsp; No Link

      v-btn(:color="navColor" small) {{ moduleName | capitalize }}

      v-fade-transition(mode="out-in")
        v-toolbar-side-icon(v-if="navIcon" @click.stop="toggleDrawer")
  v-snackbar(v-if="statusText" :timeout="6000" color="red" :top="true" v-model="snackbar") {{ statusText.message }}
    v-btn(flat @click.native="snackbar = false") CLOSE
</template>

<script>
import { vehicleStateQuery, vehicleStateSubscription, vehicleStateMutate } from '../../plugins/graphql/gql/VehicleState.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../plugins/graphql/gql/VfrHud.gql'
import { statusTextQuery, statusTextSubscription } from '../../plugins/graphql/gql/StatusText.gql'

export default {
  name: 'TopNav',

  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  data () {
    return {
      publicPath: process.env.BASE_URL,
      vehicleStateData: {},
      vfrHudData: [],
      statusTextData: [],
      tickers: {
        state: false,
        vfrHud: false
      },
      snackbar: false,
      statusText: '',
      fcTime: null
    }
  },

  // Use timers to set intervals for each message so we can limit the update frequency in the client
  timers: {
    setTickers: { time: 500, autostart: true, repeat: true }
  },

  computed: {
    activeApi () {
      return this.$store.state.activeApi
    },
    height () {
      return window.innerHeight
    },
    moduleName () {
      return this.$store.state.moduleName
    },
    navIcon () {
      return this.$store.state.navIcon
    },
    navColor () {
      return this.$store.state.navColor
    },
    navDrawer () {
      return this.$store.state.navDrawer
    },
    routePath () {
      return this.$store.state.route.path
    },
    statusData () {
      return this.$store.state.statusData
    },
    vehicleData () {
      return this.$store.state.vehicleData
    },
    vehicleModeGroup () {
      if (this.vehicleData[this.activeApi].typeString == 'Copter' || this.vehicleData[this.activeApi].typeString == 'Heli') {
        return 'COPTER_MODE'
      } else if (this.vehicleData[this.activeApi].typeString == 'Plane') {
        return 'PLANE_MODE'
      } else if (this.vehicleData[this.activeApi].typeString == 'Rover' || this.vehicleData[this.activeApi].typeString == 'Boat') {
        return 'ROVER_MODE'
      } else if (this.vehicleData[this.activeApi].typeString == 'ArduSub') {
        return 'SUB_MODE'
      }
    }
  },

  watch: {
    // Watch apis state for any change and process
    activeApi: {
      handler: function (newValue) {
        this.createQueries()
      }
    }
  },

  mounted () {
    this.createQueries()
  },

  methods: {
    changeApi (api) {
      this.$store.commit('setActiveApi', api)
    },
    changeMode (mode) {
      this.logDebug(`vehicleMode: setting value: ${mode}`)
      this.mutateQuery(this.activeApi, vehicleStateMutate, { mode: mode })
    },
    createQueries () {
      if (this.activeApi) {
        this.createQuery('VehicleState', vehicleStateQuery, this.activeApi, 'vehicleStateData')
        this.createSubscription('VehicleState', vehicleStateSubscription, this.activeApi, 'vehicleStateData')
        this.createQuery('VfrHud', vfrHudQuery, this.activeApi, 'vfrHudData')
        this.createSubscription('VfrHud', vfrHudSubscription, this.activeApi, 'vfrHudData')
        this.createQuery('StatusText', statusTextQuery, this.activeApi, null, this.processStatusText)
        this.createSubscription('StatusText', statusTextSubscription, this.activeApi, null, this.processStatusText)
      }
    },
    processStatusText (data, key) {
      const api = key.split('___')[0]
      if (!this.statusTextData[api]) {
        this.statusTextData[api] = []
      }
      this.statusTextData[api].push(data.data.StatusText)
    },
    setTickers () {
      this.tickers.vehicleState = true
      this.tickers.vfrHud = true
    },
    toggleDrawer () {
      this.$store.commit('setNavDrawer', !this.$store.state.navDrawer)
    }
  }

}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>
