<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <div
      v-for="(field, fieldname, index) in stateMessage"
      :index="index"
      :fieldname="fieldname"
      :field="field">
        {{index}} {{fieldname}}: {{field}}
    </div>
  </div>
</template>

<script>
  import { STATE_QUERY } from '../constants/graphql'
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
        query: STATE_QUERY
      }
    }
  }
</script>
