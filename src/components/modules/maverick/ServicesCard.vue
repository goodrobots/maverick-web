<template lang='pug'>
v-container
  v-card
    v-toolbar(:color="navColor" dense)
      v-toolbar-title Services
    v-data-table.elevation-1(v-if="activeApi && services[activeApi]" :headers="headers" :items="Object.values(services[activeApi])")
      template(v-slot:item.running="{ item }")
        v-icon(right v-if="item.running" color='green') check-circle-outline
        v-icon(right v-else color='red') error_outline
      template(v-slot:item.enabled="{ item }")
        v-icon(right v-if="item.enabled" color='green') check-circle-outline
        v-icon(right v-else color='red') error_outline
</template>

<script>
export default {
  name: 'ServicesCard',
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'displayName' },
        { text: 'Category', value: 'displayCategory' },
        { text: 'Running', value: 'running' },
        { text: 'Enabled', value: 'enabled' },
      ]
    }
  },

  computed: {

  },

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        // this.createQueries()
      },
      deep: true
    },
    activeApi: {
      handler: function (newValue) {
        // this.logDebug(this.services[this.activeApi])
        // this.logDebug(Object.values(this.services[this.activeApi]))
      }
    }
  },

  mounted () {
    // setTimeout(() => this.createQueries(), 2000)
  },
  
  methods: {
    createQueries () {
      if (this.activeApi) {
        /*
        if (this.verifyQuery(maverickServiceQuery)) {
          // createQuery (message, gql, api, container, skip = false, callback = null, errorCallback = null, variables = null) 
          this.createQuery('MaverickService', maverickServiceQuery, this.activeApi, null, null, this.processServiceQuery, null, { name: 'maverick-visiond' })
          this.createSubscription('MaverickService', maverickServiceSubscription, this.activeApi, null, null, this.processServiceSubscription, null, { name: 'maverick-visiond' })
        }
        */
      }
    },
    processServiceQuery (data, key) {
      const api = key.split('___')[0]
      this.logDebug(`processServiceQuery: ${api}`)
      this.logDebug(data)
      if (data.data && 'MaverickService' in data.data) {
        if (!(api in this.serviceData)) {
          this.serviceData = data.data.MaverickService
        }
      }
    },
    processServiceSubscription (data, key) {
      const api = key.split('___')[0]
      this.logDebug(`processServiceSubscription: ${api}`)
      this.logDebug(data)
      if (data.data && 'MaverickService' in data.data) {
        if (!(api in this.serviceData)) {
          this.serviceData = data.data.MaverickService
        }
      }
    }
  }
}
</script>