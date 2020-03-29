<template lang='pug'>
v-container(fluid)
  v-card
    v-toolbar(:color="navColor" dense)
      v-toolbar-title Maverick Services
      v-spacer
      v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    // v-card-title(:color="navColor" dense)
      span Maverick Services
      v-spacer
      v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    v-data-table.elevation-1(v-if="activeApi && services[activeApi]" dense :headers="headers" :items="Object.values(services[activeApi])" :search="search" sort-by="displayName" sort-desc=false)
      template(v-slot:item.displayCategory="{ item }")
        span(v-if="item.displayCategory") {{ item.displayCategory }}
        span.text--disabled(v-else) ---
      template(v-slot:item.running="{ item }")
        v-switch(dense color="success" :input-value="item.running" @change="(switchstate) => toggleRunning(item, switchstate)")
      template(v-slot:item.enabled="{ item }")
        v-switch(dense color="success" :input-value="item.enabled" @change="(switchstate) => toggleEnabled(item, switchstate)")
      template(v-slot:no-data)
        v-alert.ma-8(border="left" outlined type="primary")
          span No services are available.  Please activate an API connection before controlling services.
      template(v-slot:no-results)
        v-alert.ma-8(border="left" outlined type="primary")
          span No services are available.  Please activate an API connection before controlling services.
</template>

<script>
import { maverickServiceRunningMutate, maverickServiceEnabledMutate } from '../../../plugins/graphql/gql/MaverickService.gql'

export default {
  name: 'MaverickServices',
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'displayName' },
        { text: 'Category', value: 'displayCategory' },
        { text: 'Running', value: 'running' },
        { text: 'Enabled', value: 'enabled' },
      ],
      search: ''
    }
  },

  computed: {
    items () {
      if (this.services.hasOwnProperty(this.activeApi)) {
        return Object.values(this.services[this.activeApi])
      } else {
        return {}
      }
    },
    services () {
      return this.$store.state.core.serviceData
    }
  },

  watch: {
  },

  mounted () {
  },
  
  methods: {
    toggleRunning (item, switchstate) {
      // this.logDebug(item, switchstate)
      this.mutateQuery(this.activeApi, maverickServiceRunningMutate, { name: item.name, running: !item.running })
    },
    toggleEnabled (item, switchstate) {
      // this.logDebug(item, switchstate)
      this.mutateQuery(this.activeApi, maverickServiceEnabledMutate, { name: item.name, enabled: !item.enabled })
    }
  }
}
</script>
