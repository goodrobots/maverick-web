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
            tr
              td Vehicle Type
              td.primary--text(v-html="valueFormat(findParam('SYSID_SW_TYPE'))")
            template(v-if="findParam('FRAME_CLASS')")
              tr
                td Frame Class
                td.primary--text(v-html="valueFormat(findParam('FRAME_CLASS'))")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(findParam('FRAME_TYPE'))")
            // PX4 Params
            template(v-else-if="findParam('MAV_TYPE')")
              tr
                td Frame Type
                td.primary--text(v-html="valueFormat(findParam('MAV_TYPE'))")
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
              template(v-if="findParam('LOG_BACKEND_TYPE') && findParam('LOG_BACKEND_TYPE').value==3")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_BACKEND_TYPE'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_BACKEND_TYPE'))")
            tr
              td Logging while Disarmed
              template(v-if="findParam('LOG_DISARMED') && findParam('LOG_DISARMED').value==0")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_DISARMED'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_DISARMED'))")
            tr
              td Stop/Rotate log on Disarm
              template(v-if="findParam('LOG_FILE_DSRMROT') && findParam('LOG_FILE_DSRMROT').value==1")
                td.green--text Good
                td.green--text(v-html="valueFormat(findParam('LOG_FILE_DSRMROT'))")
              template(v-else)
                td.red--text Bad
                td.red--text(v-html="valueFormat(findParam('LOG_FILE_DSRMROT'))")
</template>

<script>
import Vue from 'vue'
import { paramsQuery, paramsSubscription, updateParam } from '../../../plugins/apollo/graphql/Parameters.gql'
export default {
  name: 'ConfigParamSummary',
  data () {
    return {
      params: []
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  destroyed () {
    // this.$apollo.destroy()
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
    },
    findParam (id) {
      return this.params.find(x => x.id === id)
    }
  },

  apollo: {
    $client () { return this.activeApi },
    params: {
      query: paramsQuery,
      manual: true,
      result ({ data, loading }) {
        if (!loading && !this.params.length) {
          Object.keys(data.params).forEach(key => { Vue.set(this.params, key, data.params[key]) })
        }
        // console.log('received params: ' + this.params.length)
      },
      /*
      subscribeToMore: {
        document: paramsSubscription,
        // If we receive updated param, iterate through the existing params (previousResult) and carefully update just the updated parameter
        updateQuery: (previousResult, { subscriptionData }) => {
          const update = subscriptionData.data.params
          if (!/^STAT_/.test(update.id)) {
            console.log('Updating parameter: ' + update.id)
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
        }
      },
      */
      mutation: updateParam
    },
    $subscribe: {
      params: {
        query: paramsSubscription,
        result (data) {
          const paramIx = this.findParamIndex(data.data.params.id)
          Vue.set(this.params, paramIx, data.data.params)
          // console.log('subscribe result: ' + this.params[paramIx])
        }
      }
    }
  }
}
</script>
