<template lang='pug'>
div
  v-data-iterator(:items="items" hide-default-footer single-expand=true)

    template(v-slot:header)
      v-toolbar.mb-1(:color="navColor" dark flat)
        v-toolbar-title Connections
        v-spacer
        v-text-field(v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search")
        v-spacer
    
    template(v-slot:default="{ items, isExpanded, expand }")
      v-row
        v-col(v-for="item in items" :key="item.name" cols="12" sm="12" md="12" lg="12")
          v-card
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline
                  span {{ item.name }}
                  v-chip.ma-2(v-if="item.state" color='green' small)
                    v-icon(left) mdi-check-circle
                    span Connected
                  v-chip.ma-2(v-else color='red' small)
                    v-icon(left) mdi-alert-circle
                    span Not Connected
              div
                v-switch.pl-4(:color="navColor" :input-value="isExpanded(item)" :label="isExpanded(item) ? 'Editing' : 'Edit'" @change="(v) => expand(item, v)")
          v-list(v-if="isExpanded(item)" dense)
            v-list-item
              v-divider
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.name" label="API Name/Description" required)
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.httpEndpoint" label="GraphQL Endpoint" required)
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.wsEndpoint" label="Websockets Endpoint" required)
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.schemaEndpoint" label="Schema Endpoint" required)
              v-list-item-content.align-end
            v-list-item
              v-divider
            v-list-item
              v-btn(color='green' @click="save(item)") Save
              v-btn.ml-2(color='blue') Connect
</template>

<script>
export default {
  name: "ConfigConnections",
  components: {
  },
  data() {
    return {
      search: '',
      filter: {}
    }
  },
  computed: {
    items () {
      return Object.values(this.apis)
    }
  },
  methods: {
    save(apiData) {
      this.$store.commit('core/setApiData', {api: apiData.key, data: apiData})
      // If any of the endpoints have changed, destroy and recreate the client
      // this.deleteQueries(apiData.key)
      // delete this.$apollo.provider.clients[apiData.key]
      // this.createClient(apiData.key+'new', apiData)
    },
    connect() {
      this.logDebug('connecting')

    }
  }
}
</script>
