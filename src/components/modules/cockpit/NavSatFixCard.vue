<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>GPS Position Data</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span class="grey--text">Latitude:</span>
        <span>{{ navSatFixMessage.latitude }}</span>
      </div>
      <div>
        <span class="grey--text">Longitude:</span>
        <span>{{ navSatFixMessage.longitude }}</span>
      </div>
      <div>
        <span class="grey--text">Altitude:</span>
        <span>{{ navSatFixMessage.altitude }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  navSatFixQuery,
  navSatFixSubscription,
  navSatFixMutate
} from '../../../plugins/graphql/gql/gql/NavSatFix.gql'

export default {
  name: 'NavSatFixCard',
  data () {
    return {
      navSatFixMessage: [],
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
    navSatFixMessage: {
      query: navSatFixQuery,
      subscribeToMore: {
        document: navSatFixSubscription,
        updateQuery: (previousResult, { subscriptionData }) => ({
          navSatFixMessage: subscriptionData.data.navSatFixMessage
        })
      },
      mutation: navSatFixMutate
    }
  }
}
</script>
