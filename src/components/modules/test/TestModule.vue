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
              td VehicleInfo
              td(v-html="vehicleData[api]")
            tr
              td MissionList - 'Loaded'
              td(v-html="missionListData[api]")
            tr
              td MissionList - 'Test'
              td(v-html="missionTestData[api]")
            tr
              td MissionDatabase
              td(v-html="missionDatabaseData[api]")
          hr
</template>

<script>
import { vehicleStateQuery, vehicleStateSubscription } from '../../../plugins/graphql/gql/VehicleState.gql'
import { imuQuery, imuSubscription } from '../../../plugins/graphql/gql/Imu.gql'
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../../plugins/graphql/gql/VfrHud.gql'
import { poseStampedQuery, poseStampedSubscription } from '../../../plugins/graphql/gql/PoseStamped.gql'
import { missionListQuery, missionListSubscription } from '../../../plugins/graphql/gql/MissionList.gql'
import { missionDatabaseQuery, missionDatabaseSubscription } from '../../../plugins/graphql/gql/MissionDatabase.gql'
export default {
  name: 'TestModule',

  data () {
    return {
      vehicleStateData: {},
      imuData: {},
      navSatFixData: {},
      vfrHudData: {},
      poseStampedData: {},
      missionListData: {},
      missionTestData: {},
      missionDatabaseData: {}
    }
  },

  computed: {
    statusData () {
      return this.$store.state.statusData
    },
    vehicleData () {
      return this.$store.state.vehicleData
    }
  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('VehicleState', vehicleStateQuery, api, 'vehicleStateData')
          this.createSubscription('VehicleState', vehicleStateSubscription, api, 'vehicleStateData')

          this.createQuery('Imu', imuQuery, api, 'imuData')
          this.createSubscription('Imu', imuSubscription, api, 'imuData')

          this.createQuery('NavSatFix', navSatFixQuery, api, 'navSatFixData')
          this.createSubscription('NavSatFix', navSatFixSubscription, api, 'navSatFixData')

          this.createQuery('VfrHud', vfrHudQuery, api, 'vfrHudData')
          this.createSubscription('VfrHud', vfrHudSubscription, api, 'vfrHudData')

          this.createQuery('PoseStamped', poseStampedQuery, api, 'poseStampedData')
          this.createSubscription('PoseStamped', poseStampedSubscription, api, 'poseStampedData')

          this.createQuery('MissionList', missionListQuery, api, 'missionListData', null, null, null, { id: 'loaded' })
          this.createSubscription('MissionList', missionListSubscription, api, 'missionListData', null, null, null, { id: 'loaded' })

          this.createQuery('MissionList', missionListQuery, api, 'missionTestData', null, null, null, { id: 'test' })
          this.createSubscription('MissionList', missionListSubscription, api, 'missionTestData', null, null, null, { id: 'test' })

          this.createQuery('MissionDatabase', missionDatabaseQuery, api, 'missionDatabaseData', null, null, null, { id: '' })
          this.createSubscription('MissionDatabase', missionDatabaseSubscription, api, 'missionDatabaseData', null, null, null, { id: '' })
        }
      },
      deep: true
    }
  }

}
</script>
