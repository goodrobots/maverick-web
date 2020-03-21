<template lang='pug'>
div
  transition(name="slide-y-transition" mode="out-in")
    v-app-bar(app flat fixed dense clipped-left :color="navColor+' darken-4'" height=48)
      v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" text left small to="/"): img(:src="publicPath + 'img/logos/maverick-logo-white.svg'" height='35px')
      v-spacer
      v-toolbar-items
        // StatusText Messages
        transition(name="fade-transition" mode="out-in")
          v-menu(offset-y v-if="activeApi && statusTextData[activeApi] && statusTextData[activeApi].length > 0" :max-height="height - 100")
            template(v-slot:activator="{ on }")
              v-btn(v-on="on" text)
                v-icon(color="warning") mdi-message-alert
            v-list(two-line subheader dense)
              v-system-bar(:color="navColor")
                span Vehicle Messages
                div.flex-grow-1
                v-icon(@click="statusTextData[activeApi] = []") mdi-delete
              // v-subheader Messages
              v-list-item(v-for="(message, index) in statusTextData[activeApi]" :key="index")
                v-list-item-content(v-if="message")
                  v-list-item-title(v-text="message.message")
                  v-list-item-subtitle(v-text="(fcTime - message.secs > 60) ? Math.round((fcTime - message.secs) / 60) + ' minutes ago' : fcTime - message.secs + ' seconds ago'")

        // Armed/Disarmed button
        v-btn(v-if="vehicleStateData[activeApi] && vehicleStateData[activeApi].armed" color="yellow" text) ARMED
        v-btn.transparent(v-else-if="vehicleStateData[activeApi]" text) DISARMED
        // Mode button
        v-menu(v-if="vehicleStateData[activeApi]" offset-y transition="scale-transition" :max-height="height - 100")
          template(v-slot:activator="{ on }")
            v-btn(text v-on="on" v-text="vehicleStateData[activeApi].mode")
          v-list
            v-list-item(v-for="(mode, ix) in mavlinkGroup(vehicleModeGroup)" :key="ix" @click="changeMode(ix)")
              v-list-item-title {{ mode.name }}
        // Altitude button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].altitude" v-html="'Alt<br>' + vfrHudData[activeApi].altitude.toFixed(2) + 'm'" text)
        // Heading button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].heading && !$vuetify.breakpoint.smAndDown" v-html="'Hdg<br>' + vfrHudData[activeApi].heading" text)
        // Speed button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].groundspeed && !$vuetify.breakpoint.smAndDown" v-html="'Spd<br>' + vfrHudData[activeApi].groundspeed.toFixed(2)" text)

      v-spacer

      v-menu(offset-y transition="scale-transition" left=true nudge-bottom="10")
        template(v-slot:activator="{ on }")
          v-btn(v-if="activeApi && apis.hasOwnProperty(activeApi)" small v-on="on" v-text="apis[activeApi]['name']" :color="(isApiReady(activeApi)) ? 'success' : 'error'")
          v-btn.text--blue-grey.lighten-5(v-else small v-on="on") No Active API
        v-list(rounded)
          v-list-item(v-for="(data, key) in apis" :key="key" @click='changeApi(key)')
            v-list-item-avatar
              v-img(v-if="apistate[key] && apistate[key].icon" :src="publicPath + apistate[key].icon" contain=true)
            v-list-item-content
              v-list-item-title {{ data.name }}
            v-icon(right v-if="apistate[key]" color='green' small) mdi-check-circle-outline
            v-icon(right v-else color='red' small) mdi-alert-circle-outline

      v-menu(offset-y transition="scale-transition" left=true nudge-bottom="10")
        template(v-slot:activator="{ on }")
          v-btn.mx-3(:color="navColor" small v-on="on") {{ moduleName | capitalize }}
        v-list
          v-list-item(v-for="(data, key) in $store.state.core.modules" v-if="$store.state.data.modulesActive[key] == true" :key="key" :color="data.color")
            v-btn(:color="data.color" :to="'/' + key" block) {{ key | capitalize }}
                  v-icon(right) {{ data.icon }}

      v-fade-transition(mode="out-in")
        v-app-bar-nav-icon(v-if="navDrawerEnable" @click.stop="toggleDrawer")

  v-snackbar(v-if="statusText" :timeout="6000" color="red" :top="true" v-model="snackbar") {{ statusText.message }}
    v-btn(text @click.native="snackbar = false") CLOSE
</template>

<script>
import { vehicleStateQuery, vehicleStateSubscription, vehicleStateMutate } from '../../plugins/graphql/gql/VehicleState.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../plugins/graphql/gql/VfrHud.gql'
import { statusTextQuery, statusTextSubscription } from '../../plugins/graphql/gql/StatusText.gql'

export default {
  name: 'TopNav',

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
    height () {
      return window.innerHeight
    },
    statusData () {
      return this.$store.state.core.statusData
    },
    vehicleData () {
      return this.$store.state.core.vehicleData
    },
    vehicleModeGroup () {
      if (this.vehicleData[this.activeApi]) {
        if (this.vehicleData[this.activeApi].typeString == 'Copter' || this.vehicleData[this.activeApi].typeString == 'Heli') {
          return 'COPTER_MODE'
        } else if (this.vehicleData[this.activeApi].typeString == 'Plane') {
          return 'PLANE_MODE'
        } else if (this.vehicleData[this.activeApi].typeString == 'Rover' || this.vehicleData[this.activeApi].typeString == 'Boat') {
          return 'ROVER_MODE'
        } else if (this.vehicleData[this.activeApi].typeString == 'ArduSub') {
          return 'SUB_MODE'
        } else {
          return null
        }
      } else {
        return null
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
    setTimeout(() => this.createQueries(), 2000)
  },

  methods: {
    changeApi (api) {
      this.$store.commit('data/setActiveApi', api)
    },
    changeMode (mode) {
      this.logDebug(`vehicleMode: setting value: ${mode}`)
      this.mutateQuery(this.activeApi, vehicleStateMutate, { mode: mode })
    },
    createQueries () {
      if (this.activeApi) {
        if (this.verifyQuery(vehicleStateQuery)) {
          this.createQuery('VehicleState', vehicleStateQuery, this.activeApi, 'vehicleStateData')
          this.createSubscription('VehicleState', vehicleStateSubscription, this.activeApi, 'vehicleStateData')
        }
        if (this.verifyQuery(vfrHudQuery)) {
          this.createQuery('VfrHud', vfrHudQuery, this.activeApi, 'vfrHudData')
          this.createSubscription('VfrHud', vfrHudSubscription, this.activeApi, 'vfrHudData')
        }
        if (this.verifyQuery(statusTextQuery)) {
          this.createQuery('StatusText', statusTextQuery, this.activeApi, null, null, this.processStatusText)
          this.createSubscription('StatusText', statusTextSubscription, this.activeApi, null, null, this.processStatusText)
        }
      }
    },
    processStatusText (data, key) {
      const api = key.split('___')[0]
      if (!this.statusTextData[api]) {
        this.statusTextData[api] = []
      }
      if (!data.data.StatusText.message.includes("HP: requesting home position")) {
        this.statusTextData[api].push(data.data.StatusText)
      }
    },
    setTickers () {
      this.tickers.vehicleState = true
      this.tickers.vfrHud = true
    },
    toggleDrawer () {
      this.$store.commit('core/setNavDrawer', !this.navDrawer)
    }
  }

}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>
