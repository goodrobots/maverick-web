<template lang='pug'>
v-content
  transition(name="slide-y-transition" mode="out-in")
    v-toolbar(fixed dense clipped-left :color="navColor" app)
      v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" flat disabled left small): img(src='@/assets/img/logos/mavlogo-orangewhite.svg' height='75%')
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
                v-list-tile-content
                  v-list-tile-title(v-text="message.message")
                  v-list-tile-sub-title(v-text="(fcTime - message.secs > 60) ? Math.round((fcTime - message.secs) / 60) + ' minutes ago' : fcTime - message.secs + ' seconds ago'")
        // Armed/Disarmed button
        v-btn(v-if="stateMessage.armed" color="yellow" flat) ARMED
        v-btn.transparent(v-else flat ripple=false) DISARMED
        // Mode button
        v-btn.transparent(v-html="stateMessage.mode" depressed)
        // v-select(:items="flightModes" overflow :label="stateMessage.mode")
        // Altitude button
        v-btn.transparent(v-if="vfrHudMessage.altitude" v-html="'Alt<br>' + vfrHudMessage.altitude.toFixed(2) + 'm'" flat ripple=false)
        // Heading button
        v-btn.transparent(v-if="vfrHudMessage.heading && !$vuetify.breakpoint.smAndDown" v-html="'Hdg<br>' + vfrHudMessage.heading" flat ripple=false)
        // Speed button
        v-btn.transparent(v-if="vfrHudMessage.groundspeed && !$vuetify.breakpoint.smAndDown" v-html="'Spd<br>' + vfrHudMessage.groundspeed.toFixed(2)" flat ripple=false)
      v-spacer
      v-toolbar-items
        v-menu(offset-y)
          v-btn(flat slot="activator" v-text="apis[activeApi]")
          v-list
            v-list-tile(v-for="(api, key) in apis" :key="api" @click='changeApi(key)')
              v-list-tile-title(v-text="api")
      v-fade-transition(mode="out-in")
        v-toolbar-side-icon(v-if="navIcon" @click.stop="toggleDrawer")
  v-snackbar(:timeout="6000" color="red" :top="true" v-model="snackbar") {{ statusTextMessage.message }}
    v-btn(flat @click.native="snackbar = false") CLOSE
</template>

<script>
import { vfrHudQuery, vfrHudSubscription } from '../../graphql/VfrHudMessage.gql'
import { stateQuery, stateSubscription } from '../../graphql/StateMessage.gql'
import { statusTextQuery, statusTextSubscription } from '../../graphql/StatusTextMessage.gql'

export default {
  name: 'TopNav',
  data () {
    return {
      stateMessage: [],
      vfrHudMessage: [],
      flightModes: [
        'Guided',
        'Stabilize'
      ],
      tickers: {
        'stateMessage': false,
        'vfrHudMessage': false
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
    routePath () { return this.$store.state.route.path },
    navIcon () { return this.$store.state.navIcon },
    navColor () { return this.$store.state.navColor },
    navDrawer () { return this.$store.state.navDrawer },
    apis () { return this.$store.state.apis },
    activeApi () { return this.$store.state.activeApi },
    height () { return window.innerHeight }
  },

  methods: {
    changeApi (api) {
      this.$store.commit('setApi', api)
    },
    toggleDrawer () {
      this.$store.commit('setNavDrawer', !this.$store.state.navDrawer)
    },
    setTickers () {
      this.tickers['stateMessage'] = true
      this.tickers['vfrHudMessage'] = true
    }
  },

  apollo: {
    $client () { return this.activeApi },

    // Setup apollo queries
    statusTextMessage: statusTextQuery,
    vfrHudMessage: vfrHudQuery,
    stateMessage: stateQuery,

    // Setup apollo subscriptions to run once every ticker interval
    $subscribe: {
      vfrHudMessage: {
        query: vfrHudSubscription,
        result ({ data }) {
          if (this.vfrHudMessage !== data.vfrHudMessage && this.tickers['vfrHudMessage']) {
            this.vfrHudMessage = data.vfrHudMessage
            this.tickers['vfrHudMessage'] = false // Turn the ticker off until the next interval
          }
        }
      },
      stateMessage: {
        query: stateSubscription,
        result ({ data }) {
          if (this.stateMessage !== data.stateMessage && this.tickers['stateMessage']) {
            this.stateMessage = data.stateMessage
            this.tickers['stateMessage'] = false // Turn the ticker off until the next interval
            this.fcTime = data.stateMessage.secs
          }
        }
      },
      statusTextMessage: {
        query: statusTextSubscription,
        result ({ data }) {
          this.statusTextMessage = data.statusTextMessage
          this.statusTextMessages.unshift(data.statusTextMessage)
          this.snackbar = true
        }
      }
    }
  }
}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>
