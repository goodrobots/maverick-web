<template lang='pug'>
div
  v-container(fluid grid-list-xl)
    v-layout(row wrap)
      v-flex(xs3)
        v-btn(color="red darken-1" to="../analysis-index")
          v-icon(left) arrow_back
          span Return to Index
      v-flex(xs9 v-if="mavlog")
        table
          thead
            tr
              th Filename
              th Start
              th Finish
              th Description
              th State
          tbody
            tr
              td(v-html="mavlog.filename")
              td(v-html="mavlog.start")
              td(v-html="mavlog.finish")
              td(v-html="mavlog.description")
              td(v-html="mavlog.state")
  iframe.graphs(v-if="mavlog" :src="`/analysis/grafana/d/Zhqb8-kmk/flight-data-analysis?orgId=10&from=${mavlog.start * 1000}&to=${mavlog.finish * 1000}&kiosk=true`" width="100%" frameborder="0")
</template>

<script>
import { mavlogsQuery } from '../../../graphql/Mavlogs.gql'

export default {
  name: 'AnalysisIndex',

  data () {
    return {
      mavlogs: [],
      mavlog: null,
      mavlogId: this.$route.params.id
    }
  },

  computed: {
    activeApi () { return this.$store.state.activeApi }
  },

  // This is ugly, we should do a reactive parameter query to fetch a single entry
  apollo: {
    $client () { return this.activeApi },
    mavlogs: {
      query: mavlogsQuery
    }
  },

  watch: {
    mavlogs () {
      // This is ugly, see note above apollo section
      Object(this.mavlogs).forEach(element => {
        if (element.id === this.mavlogId) {
          this.mavlog = element
        }
      })
    }
  }

}
</script>

<style scoped>
table {
  width: 100%;
}
table thead th {
  text-align: left;
}
.graphs {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
