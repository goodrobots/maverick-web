<template lang='pug'>
div
  transition(name="slide-y-transition" mode="out-in")
    v-toolbar(app fixed dense flat clipped-left :color="navColor" :height=48)
      // v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" flat left small to="/"): img(src='@/assets/img/logos/mavlogo-orangewhite.svg' height='35px')
      v-spacer
      v-toolbar-items
        // StatusText Messages
        transition(name="fade-transition" mode="out-in")
          v-menu(offset-y v-if="statusTexts.length > 0" :max-height="height - 100")
            v-btn(flat slot="activator")
              v-icon warning
            v-list(two-line subheader dense)
              v-subheader Messages
                v-btn(flat @click="statusTexts = []")
                  v-icon(small) delete
              v-list-tile(v-for="(message, index) in statusTexts" :key="index")
                v-list-tile-content(v-if="message")
                  v-list-tile-title(v-text="message.message")
                  v-list-tile-sub-title(v-text="(fcTime - message.secs > 60) ? Math.round((fcTime - message.secs) / 60) + ' minutes ago' : fcTime - message.secs + ' seconds ago'")
        // Armed/Disarmed button
        v-btn(v-if="vehicleStateData[activeApi] && 'armed' in vehicleStateData[activeApi]" color="yellow" flat) ARMED
        v-btn.transparent(v-else-if="vehicleStateData[activeApi]" flat ripple=false) DISARMED
        // Mode button
        v-btn.transparent(v-if="vehicleStateData[activeApi]" v-html="vehicleStateData[activeApi].mode" depressed)
        // v-select(:items="flightModes" overflow :label="vehicleStateData[activeApi].mode")
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
                v-img(v-if="apis[key]" :src="apis[key].icon" contain=true)
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
      v-fade-transition(mode="out-in")
        v-toolbar-side-icon(v-if="navIcon" @click.stop="toggleDrawer")
  v-snackbar(v-if="statusText" :timeout="6000" color="red" :top="true" v-model="snackbar") {{ statusText.message }}
    v-btn(flat @click.native="snackbar = false") CLOSE
</template>

<script>
import { vehicleStateQuery, vehicleStateSubscription } from '../../plugins/graphql/gql/VehicleState.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../plugins/graphql/gql/VfrHud.gql'
export default {
  name: 'TopNav',
  data () {
    return {
      vehicleStateData: {},
      vfrHudData: [],
      flightModes: ['Guided', 'Stabilize'],
      tickers: {
        state: false,
        vfrHud: false
      },
      snackbar: false,
      statusText: '',
      statusTexts: [],
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
    routePath () {
      return this.$store.state.route.path
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
    height () {
      return window.innerHeight
    },
    statusData () {
      return this.$store.state.statusData
    },
    vehicleData () {
      return this.$store.state.vehicleData
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('VehicleState', vehicleStateQuery, api, 'vehicleStateData')
          this.createSubscription('VehicleState', vehicleStateSubscription, api, 'vehicleStateData')
          this.createQuery('VfrHud', vfrHudQuery, api, 'vfrHudData')
          this.createSubscription('VfrHud', vfrHudSubscription, api, 'vfrHudData')
        }
      }
    }
  },

  methods: {
    changeApi (api) {
      this.$store.commit('setActiveApi', api)
    },
    toggleDrawer () {
      this.$store.commit('setNavDrawer', !this.$store.state.navDrawer)
    },
    setTickers () {
      this.tickers.vehicleState = true
      this.tickers.vfrHud = true
    }
  }
}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>
