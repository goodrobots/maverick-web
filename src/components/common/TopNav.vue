<template lang='pug'>
div
  transition(name="slide-y-transition" mode="out-in")
    v-toolbar(app fixed dense flat clipped-left :color="navColor" :height=48)
      // v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" flat left small to="/"): img(src='@/assets/img/logos/mavlogo-orangewhite.svg' height='35px')
      v-spacer
      v-toolbar-items
        // StatusText Messages
        transition(name="fade-transition" mode="out-in")
          v-menu(offset-y v-if="statusTextMessages.length > 0" :max-height="height - 100")
            v-btn(flat slot="activator")
              v-icon warning
            v-list(two-line subheader dense)
              v-subheader Messages
                v-btn(flat @click="statusTextMessages = []")
                  v-icon(small) delete
              v-list-tile(v-for="(message, index) in statusTextMessages" :key="index")
                v-list-tile-content(v-if="message")
                  v-list-tile-title(v-text="message.message")
                  v-list-tile-sub-title(v-text="(fcTime - message.secs > 60) ? Math.round((fcTime - message.secs) / 60) + ' minutes ago' : fcTime - message.secs + ' seconds ago'")
        // Armed/Disarmed button
        v-btn(v-if="stateData[activeApi] && 'armed' in stateData[activeApi]" color="yellow" flat) ARMED
        v-btn.transparent(v-else-if="stateData[activeApi]" flat ripple=false) DISARMED
        // Mode button
        v-btn.transparent(v-if="stateData[activeApi]" v-html="stateData[activeApi].mode" depressed)
        // v-select(:items="flightModes" overflow :label="stateData[activeApi].mode")
        // Altitude button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].altitude" v-html="'Alt<br>' + vfrHudData[activeApi].altitude.toFixed(2) + 'm'" flat ripple=false)
        // Heading button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].heading && !$vuetify.breakpoint.smAndDown" v-html="'Hdg<br>' + vfrHudData[activeApi].heading" flat ripple=false)
        // Speed button
        v-btn.transparent(v-if="vfrHudData[activeApi] && vfrHudData[activeApi].groundspeed && !$vuetify.breakpoint.smAndDown" v-html="'Spd<br>' + vfrHudData[activeApi].groundspeed.toFixed(2)" flat ripple=false)
      v-spacer

      v-toolbar-items
        v-menu(offset-y transition="scale-transition")
          v-btn(v-if="activeApi" flat slot="activator" v-text="apis[activeApi]['name']")
          v-btn.text--blue-grey.lighten-5(v-else flat slot="activator") No Active API
          v-list
            v-list-tile(v-if="'status'" avatar v-for="(api, key) in apis" :key="key" @click='changeApi(key)')
              v-list-tile-avatar
                v-icon(v-if="api['name'].search('Copter') != -1") toys
                v-icon(v-else-if="api['name'].search('Plane') != -1") airplanemode_active
                v-icon(v-else-if="api['name'].search('Rover') != -1") directions_car
                v-icon(v-else-if="api['name'].search('Sub') != -1") directions_boat
              v-list-tile-content
                v-list-tile-title {{ api['name'] }}
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
  v-snackbar(v-if="statusTextMessage" :timeout="6000" color="red" :top="true" v-model="snackbar") {{ statusTextMessage.message }}
    v-btn(flat @click.native="snackbar = false") CLOSE
</template>

<script>
import { stateQuery, stateSubscription } from '../../plugins/graphql/gql/State.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../plugins/graphql/gql/VfrHud.gql'
export default {
  name: 'TopNav',
  data () {
    return {
      stateData: {},
      vfrHudData: [],
      flightModes: ['Guided', 'Stabilize'],
      tickers: {
        stateMessage: false,
        vfrHudMessage: false
      },
      snackbar: false,
      statusTextMessage: '',
      statusTextMessages: [],
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
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('StateMessage', stateQuery, api, 'stateData')
          this.createQuery('VfrHudMessage', vfrHudQuery, api, 'vfrHudData')
          this.createSubscription('StateMessage', stateSubscription, api, 'stateData')
          this.createSubscription('VfrHudMessage', vfrHudSubscription, api, 'vfrHudData')
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
      this.tickers.stateMessage = true
      this.tickers.vfrHudMessage = true
    }
  }
}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>
