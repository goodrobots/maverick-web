<template>
    <v-card>
    <v-toolbar dense>
      <v-toolbar-title>GPS Position Data</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span class="grey--text">Latitude:</span>
        <span>{{navSatFixMessage.latitude}}</span>
      </div>
      <div>
        <span class="grey--text">Longitude:</span>
        <span>{{navSatFixMessage.longitude}}</span>
      </div>
      <div>
        <span class="grey--text">Altitude:</span>
        <span>{{navSatFixMessage.altitude}}</span>
      </div>
    </v-card-text>
    </v-card>
</template>
<script>
  import { navSatFixQuery, navSatFixSubscription, navSatFixMutate } from '../graphql/NavSatFixMessage.gql'
  export default {
    name: 'NavSatFixCard',
    data () {
      return {
        navSatFixMessage: [],
        loading: 0
      }
    },
    apollo: {
      navSatFixMessage: {
        query: navSatFixQuery,
        subscribeToMore: {
          document: navSatFixSubscription,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              navSatFixMessage: subscriptionData.data.navSatFixMessage
            }
          }
        },
        mutation: navSatFixMutate
      }
    }
  }
</script>
