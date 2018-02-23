<template lang='pug'>
v-container.fluid.grid-list-xl
  v-layout.row.wrap
    v-flex.xs12.sm12.md12
      div
        span Frame Class: 
        span.primary--text(v-html="valueFormat(keyedParams.FRAME_CLASS)")
      div
        span Frame Type: 
        span.primary--text(v-html="valueFormat(keyedParams.FRAME_TYPE)")
</template>

<script>
import { paramsQuery, paramsSubscription, updateParam } from '../../../graphql/Parameters.gql'
export default {
  name: 'ConfigParamSummary',
  data () {
    return {
      params: []
    }
  },
  computed: {
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
      if (param && param.meta && param.meta.fields !== '{}') {
        const fields = JSON.parse(param.meta.fields)
        if (fields.Units) {
          return param.value + ' <span class="caption"><strong>' + fields.Units + '</strong></span>'
        }
      }
      if (param && param.meta && param.meta.values !== '{}') {
        const values = JSON.parse(param.meta.values)
        if (values[param.value]) {
          return values[param.value]
        }
      }
      return param ? param.value : null
    }
  },
  apollo: {
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
