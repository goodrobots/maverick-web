<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>VFR HUD Data</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span class="grey--text">Air Speed:</span>
        <span>{{ vfrHudMessage.airspeed }}</span>
      </div>
      <div>
        <span class="grey--text">Ground Speed:</span>
        <span>{{ vfrHudMessage.groundspeed }}</span>
      </div>
      <div>
        <span class="grey--text">Heading:</span>
        <span>{{ vfrHudMessage.heading }}</span>
      </div>
      <div>
        <span class="grey--text">Throttle:</span>
        <span>{{ vfrHudMessage.throttle }}</span>
      </div>
      <div>
        <span class="grey--text">Altitude:</span>
        <span>{{ vfrHudMessage.altitude }}</span>
      </div>
      <div>
        <span class="grey--text">Climb Rate:</span>
        <span>{{ vfrHudMessage.climb }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  vfrHudQuery,
  vfrHudSubscription,
  vfrHudMutate
} from '../../../plugins/graphql/gql/gql/VfrHudMessage.gql'

export default {
  name: 'VfrHudCard',
  data () {
    return {
      vfrHudMessage: [],
      loading: 0
    }
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    }
  },
  apollo: {
    $client () {
      return this.activeApi
    },
    vfrHudMessage: {
      query: vfrHudQuery,
      subscribeToMore: {
        document: vfrHudSubscription,
        updateQuery: (previousResult, { subscriptionData }) => ({
          vfrHudMessage: subscriptionData.data.vfrHudMessage
        })
      },
      mutation: vfrHudMutate
    }
  }
}
</script>
