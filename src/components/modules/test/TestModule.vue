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
              td(v-html="vehicleStateData[api]")
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
        v-flex(xs12)
          v-btn(v-on:click="testquery()") Test Query

</template>

<script>
import { vehicleStateQuery, vehicleStateSubscription } from '../../../plugins/graphql/gql/VehicleState.gql'
// import { vehicleStateQuery } from '../../../plugins/graphql/gql/VehicleState.gql'
// import { imuQuery } from '../../../plugins/graphql/gql/Imu.gql'
import { imuQuery, imuSubscription } from '../../../plugins/graphql/gql/Imu.gql'
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
// import { navSatFixQuery } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../../plugins/graphql/gql/VfrHud.gql'
// import { vfrHudQuery } from '../../../plugins/graphql/gql/VfrHud.gql'
import { poseStampedQuery, poseStampedSubscription } from '../../../plugins/graphql/gql/PoseStamped.gql'
// import { poseStampedQuery } from '../../../plugins/graphql/gql/PoseStamped.gql'
// import { waypointsQuery, waypointsSubscription } from '../../../plugins/graphql/gql/Waypoints.gql'

export default {
  name: 'TestModule',

  data () {
    return {
      vehicleStateData: {},
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
          this.createQuery('VehicleState', vehicleStateQuery, api, 'vehicleStateData', null, null, function () { return !this.apis[api].auth })
          this.createSubscription('VehicleState', vehicleStateSubscription, api, 'vehicleStateData', null, null, function () { return !this.apis[api].auth })

          this.createQuery('Imu', imuQuery, api, 'imuData', null, null, function () { return !this.apis[api].auth })
          this.createSubscription('Imu', imuSubscription, api, 'imuData', null, null, function () { return !this.apis[api].auth })

          this.createQuery('NavSatFix', navSatFixQuery, api, 'navSatFixData', null, null, function () { return !this.apis[api].auth })
          this.createSubscription('NavSatFix', navSatFixSubscription, api, 'navSatFixData', null, null, function () { return !this.apis[api].auth })

          this.createQuery('VfrHud', vfrHudQuery, api, 'vfrHudData', null, null, function () { return !this.apis[api].auth })
          this.createSubscription('VfrHud', vfrHudSubscription, api, 'vfrHudData', null, null, function () { return !this.apis[api].auth })

          this.createQuery('PoseStamped', poseStampedQuery, api, 'poseStampedData', null, null, function () { return !this.apis[api].auth })
          this.createSubscription('PoseStamped', poseStampedSubscription, api, 'poseStampedData', null, null, function () { return !this.apis[api].auth })

          // this.createQuery('Waypoints', waypointsQuery, api, 'waypointsData')
          // this.createSubscription('Waypoints', waypointsSubscription, api, 'waypointsData')
        }
      },
      deep: true
    }
  },

  methods: {
    testquery () {
      this.logDebug('creating test query ImuMessage')
      this.createQuery('ImuMessage', imuQuery, 'sitl1', 'imuData')
      console.log(this.$apollo.queries)
      this.$apollo.queries.ImuMessage_sitl1.refresh()
    }
  }
}
</script>
