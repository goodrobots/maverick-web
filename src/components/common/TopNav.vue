<template lang='pug'>
transition(name="slide-y-transition" mode="out-in")
  v-toolbar(fixed dense clipped-left :color="navColor" app)
    v-btn.pl-0.ml-0(v-show="!$vuetify.breakpoint.smAndDown" flat disabled left small): img(src='static/img/logos/maverick-text-logo-dark.svg' height='75%')
    v-spacer
    v-toolbar-items
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
        v-btn(flat slot="activator", v-text="apis[activeApi]")
        v-list
          v-list-tile(v-for="(api, key) in apis" :key="api" @click='changeApi(key)')
            v-list-tile-title(v-text="api")
    v-fade-transition(mode="out-in")
      v-toolbar-side-icon(v-if="navIcon" @click.stop="toggleDrawer")
</template>

<script>
import { vfrHudQuery, vfrHudSubscription, vfrHudMutate } from '../../graphql/gql/VfrHudMessage.gql'
import { stateQuery, stateSubscription, stateMutate } from '../../graphql/gql/StateMessage.gql'

export default {
  data () {
    return {
      stateMessage: [],
      vfrHudMessage: [],
      flightModes: [
        'Guided',
        'Stabilize'
      ]
    }
  },

  computed: {
    routePath () { return this.$store.state.route.path },
    navIcon () { return this.$store.state.navIcon },
    navColor () { return this.$store.state.navColor },
    navDrawer () { return this.$store.state.navDrawer },
    apis () { return this.$store.state.apis },
    activeApi () { return this.$store.state.activeApi }
  },

  methods: {
    changeApi (api) {
      this.$store.commit('setApi', api)
    },
    toggleDrawer () {
      this.$store.commit('setNavDrawer', !this.$store.state.navDrawer)
    }
  },

  apollo: {
    $client () { return this.activeApi },
    vfrHudMessage: {
      client: this.activeApi,
      query: vfrHudQuery,
      subscribeToMore: {
        document: vfrHudSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            vfrHudMessage: subscriptionData.data.vfrHudMessage
          }
        }
      },
      mutation: vfrHudMutate
    },
    stateMessage: {
      client: this.activeApi,
      query: stateQuery,
      subscribeToMore: {
        document: stateSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            stateMessage: subscriptionData.data.stateMessage
          }
        }
      },
      mutation: stateMutate
    }
  },

  watch: {
    activeApi: function () {
      // Object.values(this.$apollo.provider.clients).forEach(client => { client.resetStore(); client.cache.reset() })
    }
  },

  name: 'TopNav'
}
</script>

<style scoped>
.btn {
  line-height: normal;
}
</style>