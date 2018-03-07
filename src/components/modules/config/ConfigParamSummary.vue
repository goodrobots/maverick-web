<template lang='pug'>
v-container.fluid.grid-list-xl
  v-layout.row.wrap
    // Overview Card
    v-flex.xs12.sm6.md6
      v-card
        v-toolbar(dense)
          v-toolbar-title Overview
        v-card-text
          table(width='50%')
            // Ardupilot Params
            template(v-if="keyedParams.FRAME_CLASS")
              tr
                td Frame Class
                td.primary--text(v-html="valueFormat(keyedParams.FRAME_CLASS)")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(keyedParams.FRAME_TYPE)")
            // PX4 Params
            template(v-else-if="keyedParams.MAV_TYPE")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(keyedParams.MAV_TYPE)")
    // Checklist card
    v-flex.xs12.sm6.md6
      v-card
        v-toolbar(dense)
          v-toolbar-title Parameter Checklist
        v-card-title(primary-title)
          div
            h3.headline.mb-0.grey--text Logging
          table(width='100%')
            tr
              td Mavlink Logging
              template(v-if="keyedParams.LOG_BACKEND_TYPE && keyedParams.LOG_BACKEND_TYPE.value==3")
                td.green--text Good
                td.green--text(v-html="valueFormat(keyedParams.LOG_BACKEND_TYPE)")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(keyedParams.LOG_BACKEND_TYPE)")
            tr
              td Logging while Disarmed
              template(v-if="keyedParams.LOG_DISARMED && keyedParams.LOG_DISARMED.value==0")
                td.green--text Good
                td.green--text(v-html="valueFormat(keyedParams.LOG_DISARMED)")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(keyedParams.LOG_DISARMED)")
            tr
              td Stop/Rotate log on Disarm
              template(v-if="keyedParams.LOG_FILE_DSRMROT && keyedParams.LOG_FILE_DSRMROT.value==1")
                td.green--text Good
                td.green--text(v-html="valueFormat(keyedParams.LOG_FILE_DSRMROT)")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(keyedParams.LOG_FILE_DSRMROT)")
  v-layout.row.wrap
    
</template>

<script>
import { paramsQuery, paramsSubscription, updateParam } from '../../../graphql/gql/Parameters.gql'
export default {
  name: 'ConfigParamSummary',
  data () {
    return {
      params: []
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi },
    keyedParams () {
      let _params = {}
      for (const param of this.params) {
        _params[param.id] = param
      }
      return _params
    }
  },
  methods: {
    valueFormat (param) {
      if (param && param.meta && param.meta.units) {
        return param.value + ' <span class="caption"><strong>' + param.meta.units + '</strong></span>'
      }
      if (param && param.meta && param.meta.values) {
        const values = JSON.parse(param.meta.values)
        if (values[param.value]) {
          return values[param.value]
        }
      }
      return param ? param.value : null
    }
  },
  apollo: {
    $client () { return this.activeApi },
    params: {
      query: paramsQuery,
      subscribeToMore: {
        document: paramsSubscription,
        // If we receive updated param, iterate through the existing params (previousResult) and carefully update just the updated parameter
        updateQuery: (previousResult, { subscriptionData }) => {
          const update = subscriptionData.data.params
          return {
            params: previousResult.params.map(param => {
              // We can't update immutable apollo data, so instead create a deep copy and return that into the array map
              if (param.id === update.id) {
                let paramcopy = JSON.parse(JSON.stringify(param))
                paramcopy.value = update.value
                return paramcopy
              // Otherwise return the array object by reference
              } else {
                return param
              }
            })
          }
        }
      },
      mutation: updateParam
    }
  }
}
</script>
