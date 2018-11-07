<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Pose Data</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span class="grey--text">Pose Position X:</span>
        <span>{{ poseStampedMessage.posePositionX }}</span>
      </div>
      <div>
        <span class="grey--text">Pose Position Y:</span>
        <span>{{ poseStampedMessage.posePositionY }}</span>
      </div>
      <div>
        <span class="grey--text">Pose Position Z:</span>
        <span>{{ poseStampedMessage.posePositionZ }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import {
  poseStampedQuery,
  poseStampedSubscription,
  poseStampedMutate
} from '../../../plugins/apollo/graphql/gql/PoseStampedMessage.gql'

export default {
  name: 'PoseStampedCard',
  data () {
    return {
      poseStampedMessage: [],
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
    poseStampedMessage: {
      query: poseStampedQuery,
      subscribeToMore: {
        document: poseStampedSubscription,
        updateQuery: (previousResult, { subscriptionData }) => ({
          poseStampedMessage: subscriptionData.data.poseStampedMessage
        })
      },
      mutation: poseStampedMutate
    }
  }
}
</script>
