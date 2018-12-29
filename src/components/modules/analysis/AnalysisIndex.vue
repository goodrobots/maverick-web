<template lang='pug'>
v-container(fluid grid-list-xl)
  v-layout(row wrap)
    v-flex(xs12)
      //- Display dynamic table with parameters
      v-card.px-0.py-0.transparent.elevation-0
        v-card-title
          v-spacer
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-data-table.transparent.px-2.pt-0.pb-4(expand :search="search" :headers="headers" :items="mavlogs" :pagination.sync="pagination" item-key="id" :custom-filter="customFilter" :rows-per-page-items="[10,25,50]")
          template(slot="items" slot-scope="props")
            tr
              td.justify-center.px-0.text-xs-right
                v-btn.mx-0(icon :to="'analysis-logfile/' + props.item.id")
                  v-icon pageview
              td(v-html="props.item.source")
              td(v-html="highlight(props.item.filename, search)")
              td(v-html="props.item.start")
              td(v-html="props.item.finish")
              td(v-html="highlight(props.item.description, search)")
              td(v-html="props.item.state")
          v-alert(slot="no-results" :value="true" color="error" icon="warning") Your search for "{{ search }}" found no results.
</template>

<script>
import { mavlogsQuery } from '../../../plugins/graphql/gql/Mavlogs.gql'

export default {
  name: 'AnalysisIndex',

  data () {
    return {
      mavlogs: [],
      headers: [
        { text: '', value: '', sortable: false },
        { text: 'Source', value: 'source', align: 'left' },
        { text: 'Filename', value: 'filename', align: 'left' },
        { text: 'Start', value: 'start', align: 'left' },
        { text: 'Finish', value: 'finish', align: 'left' },
        {
          text: 'Description',
          value: 'description',
          align: 'left',
          sortable: false
        },
        { text: 'State', value: 'state', align: 'left' }
      ],
      pagination: {
        sortBy: 'start',
        descending: true
      },
      search: ''
    }
  },

  computed: {
    activeApi () {
      return this.$store.state.activeApi
    }
  },

  watch: {
    mavlogs () {
      // console.log('mavlogs')
      // console.log(this.mavlogs)
    }
  },

  mounted () {
    // Hack datatables to be transparent
    const tables = document.querySelectorAll(
      '.datatable.table, .datatable__actions'
    )
    Object.keys(tables).forEach(key => {
      tables[key].className += ' transparent'
    })
  },

  methods: {
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(
        row =>
          filter(row.id, search) ||
          filter(row.filename, search) ||
          filter(row.source, search) ||
          filter(row.description, search) ||
          filter(row.state, search)
      )
    },
    highlight (text, search) {
      if (!search) {
        return text
      }
      return text.replace(
        new RegExp(search, 'gi'),
        match => `<span class="primary--text">${match}</span>`
      )
    },
    rowColor (state) {
      if (/Error/.test(state)) {
        return 'red darken-2'
      }
      if (/processing/.test(state)) {
        return 'amber darken-2'
      }
      return ''
    }
  },

  apollo: {
    $client () {
      return this.activeApi
    },
    mavlogs: {
      query: mavlogsQuery
    }
  }
}
</script>
