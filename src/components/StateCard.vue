<template>
    <v-card>
    <v-toolbar v-if="stateMessage.armed" dense color="red">
      <v-toolbar-title>Autopilot ARMED</v-toolbar-title>
    </v-toolbar>
    <v-toolbar v-else="!stateMessage.armed" dense>
      <v-toolbar-title>Autopilot DISARMED</v-toolbar-title>
    </v-toolbar>
    <v-card-title primary-title>
      <div class="headline">{{stateMessage.mode}}</div>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">Connected:</span>
        <span>{{stateMessage.connected}}</span>
      </div>
      <div>
        <span class="grey--text">Guided:</span>
        <span class="text-xs-right">{{stateMessage.guided}}</span>
      </div>
      <div>
        <span class="grey--text">System Status:</span>
        <span class=" text-xs-right">{{stateMessage.systemStatus}}</span>
      </div>
      <div>
        <span class="grey--text">Frame ID:</span>
        <span class=" text-xs-right">{{stateMessage.frameId}}</span>
      </div>
      <div>
        <span class="grey--text">Sequence Number:</span>
        <span class=" text-xs-right">{{stateMessage.seq}}</span>
      </div>
      <div>
        <span class="grey--text">Seconds:</span>
        <span class=" text-xs-right">{{stateMessage.secs}}</span>
      </div>
      <div>
        <span class="grey--text">Nanoseconds:</span>
        <span class=" text-xs-right">{{stateMessage.nsecs}}</span>
      </div>
    </v-card-text>
    </v-card>
    
</template>
<script>
  import { stateQuery, stateSubscription, stateMutate } from '../graphql/StateMessage.gql'
  export default {
    name: 'StateCard',
    data () {
      return {
        stateMessage: [],
        loading: 0
      }
    },
    apollo: {
      stateMessage: {
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
    }
  }
</script>
