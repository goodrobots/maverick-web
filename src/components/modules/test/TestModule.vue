<template lang='pug'>
v-content
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12 sm6 md6)
        table
          tr(v-for="(data, api) in apis")
            td {{ api }}
            td: strong {{ data }}
            td(v-html="stateData[api]")
          tr
            td ActiveApi
            td: strong {{ activeApi }}
</template>

<script>
import { stateQuery, stateSubscription } from '../../../plugins/apollo/graphql/StateMessage.gql'

export default {
  name: 'TestModule',
  data () {
    return {}
  },
  watch: {
    apis () {
      for (const api in this.apis) {
        this.createQuery('stateMessage', stateQuery, api, 'stateData')
        this.createSubscription('stateMessage', stateSubscription, api, 'stateData')
      }
    }
  }
}
</script>
