<template lang='pug'>
v-content
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12)
        template(v-for="(data, api) in apis")
          table
            tr
              td(colspan=2): strong Client: {{ api }}
            tr
              td Status
              td(v-html="statusData[api]")
            tr
              td State
              td(v-html="stateData[api]")
            tr
              td Imu
              td(v-html="imuData[api]")
            tr
              td NavSatFix
              td(v-html="navSatFixData[api]")
            tr
              td VfrHud
              td(v-html="vfrHudData[api]")
            tr
              td PoseStamped
              td(v-html="poseStampedData[api]")
            tr
              td Waypoints
              td(v-html="waypointsData[api]")
          hr
</template>

<script>
// import { stateQuery, stateSubscription } from '../../../plugins/graphql/gql/State.gql'
import { stateQuery } from '../../../plugins/graphql/gql/State.gql'
/*
import { imuQuery, imuSubscription } from '../../../plugins/graphql/gql/Imu.gql'
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../../plugins/graphql/gql/VfrHud.gql'
import { poseStampedQuery, poseStampedSubscription } from '../../../plugins/graphql/gql/PoseStamped.gql'
*/
// import { waypointsQuery, waypointsSubscription } from '../../../plugins/graphql/gql/Waypoints.gql'

export default {
  name: 'TestModule',

  data () {
    return {
      stateData: {},
      imuData: {},
      navSatFixData: {},
      vfrHudData: {},
      poseStampedData: {},
      waypointsData: {},
      paramData: {}
    }
  },

  computed: {
    statusData () {
      return this.$store.state.statusData
    }
  },
  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('StateMessage', stateQuery, api, 'stateData')
          // this.createSubscription('StateMessage', stateSubscription, api, 'stateData')

          /*
          this.createQuery('ImuMessage', imuQuery, api, 'imuData')
          this.createSubscription('ImuMessage', imuSubscription, api, 'imuData')

          this.createQuery('NavSatFixMessage', navSatFixQuery, api, 'navSatFixData')
          this.createSubscription('NavSatFixMessage', navSatFixSubscription, api, 'navSatFixData')

          this.createQuery('VfrHudMessage', vfrHudQuery, api, 'vfrHudData')
          this.createSubscription('VfrHudMessage', vfrHudSubscription, api, 'vfrHudData')

          this.createQuery('PoseStampedMessage', poseStampedQuery, api, 'poseStampedData')
          this.createSubscription('PoseStampedMessage', poseStampedSubscription, api, 'poseStampedData')
          */

          // this.createQuery('Waypoints', waypointsQuery, api, 'waypointsData')
          // this.createSubscription('Waypoints', waypointsSubscription, api, 'waypointsData')
        }
      },
      deep: true
    }
  }
}
</script>
