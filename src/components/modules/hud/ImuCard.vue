<template>
    <v-card>
    <v-toolbar dense>
      <v-toolbar-title>IMU Data</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span class="grey--text">Orientation X:</span>
        <span>{{imuMessage.orientationX}}</span>
      </div>
      <div>
        <span class="grey--text">Orientation Y:</span>
        <span>{{imuMessage.orientationY}}</span>
      </div>
      <div>
        <span class="grey--text">Orientation Z:</span>
        <span>{{imuMessage.orientationZ}}</span>
      </div>
      <div>
        <span class="grey--text">Orientation W:</span>
        <span>{{imuMessage.orientationW}}</span>
      </div>
    </v-card-text>
    </v-card>
</template>
<script>
  import { imuQuery, imuSubscription, imuMutate } from '../../../graphql/ImuMessage.gql'
  export default {
    name: 'ImuCard',
    data () {
      return {
        imuMessage: [],
        loading: 0
      }
    },
    apollo: {
      imuMessage: {
        query: imuQuery,
        subscribeToMore: {
          document: imuSubscription,
          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              imuMessage: subscriptionData.data.imuMessage
            }
          }
        },
        mutation: imuMutate
      }
    }
  }
</script>
