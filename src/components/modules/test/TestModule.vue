<template lang='pug'>
v-content
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12)
        table(v-for="(data, api) in apis")
          tr
            td {{ api }}
          tr
            td(v-html="statusData[api]")
          tr
            td(v-html="stateData[api]")
          tr
            td(v-html="imuData[api]")

</template>

<script>
import { stateQuery, stateSubscription } from '../../../plugins/apollo/graphql/State.gql'
import { imuQuery, imuSubscription } from '../../../plugins/apollo/graphql/Imu.gql'

export default {
  name: 'TestModule',

  data () {
    return {
      stateData: {},
      imuData: {}
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
          this.createSubscription('StateMessage', stateSubscription, api, 'stateData')

          this.createQuery('ImuMessage', imuQuery, api, 'imuData')
          this.createSubscription('ImuMessage', imuSubscription, api, 'imuData')
}
      },
      deep: true
    }
  }
}
</script>
