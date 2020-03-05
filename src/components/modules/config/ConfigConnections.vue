<template lang='pug'>
div
  v-data-iterator(:items="items" hide-default-footer single-expand=true)

    template(v-slot:header)
      v-toolbar.mb-1(:color="navColor" dark flat)
        v-toolbar-title Connections
        v-spacer
        v-text-field(v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search")
        v-spacer
        v-btn(light @click.stop="dialog = true")
          v-icon(left) mdi-plus-box
          span Add API Connection
    
    template(v-slot:default="{ items, isExpanded, expand }")
      v-row
        v-col(v-for="item in items" :key="item.key" cols="12" sm="12" md="12" lg="12")
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
                v-text-field(v-model="item.name" label="API Name/Description")
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.httpEndpoint" label="GraphQL Endpoint")
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.wsEndpoint" label="Websockets Endpoint")
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.schemaEndpoint" label="Schema Endpoint")
              v-list-item-content.align-end
            v-list-item
              v-divider
            v-list-item
              v-btn(color='green' @click="save(item)") Save
              v-btn.ml-2(color='blue' @click="connect(item)") Connect

  v-dialog(v-model="dialog" max-width="600px")
    v-card
      v-card-title.headline(:class="navColor" primary-title)
        v-icon(left) mdi-plus-box
        span Add API Connection
      v-card-text
        v-container
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.key" label="API Key (Short)" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.name" label="API Name/Description" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.hostname" label="Hostname (FQDN) / IP Address" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.port" label="Port" required)
      v-divider
      v-card-actions
        v-btn.ma-2(color="green" @click="createConnection()") Create Connection
        v-btn.ma-2(color="grey" @click="dialog = false") Cancel
</template>

<script>
export default {
  name: "ConfigConnections",
  components: {
  },
  data() {
    return {
      search: '',
      filter: {},
      dialog: false,
      newitem: {}
    }
  },
  computed: {
    items () {
      return Object.values(this.apis)
    }
  },
  methods: {
    save(apiData) {
      this.$store.commit('data/setApiData', {api: apiData.key, data: apiData})
      // If any of the endpoints have changed, destroy and recreate the client
      // this.deleteQueries(apiData.key)
      // delete this.$apollo.provider.clients[apiData.key]
      // this.createClient(apiData.key+'new', apiData)
    },
    connect(apiData) {
      this.logDebug('connecting')
      this.logDebug(this.apis)
      if (!(this.$apollo.provider.clients[apiData.key])) {
        this.createClient(apiData.key, this.apis[apiData.key])
      }
      this.logDebug(this.$apollo.provider.clients)
    },
    createConnection() {
      this.dialog = false // Close dialog
      this.logDebug('Creating new connection: ' + this.newitem.key)
      const protocol = 'http:'
      const wsprotocol = (protocol.includes("https")) ? 'wss:' : 'ws:'
      let data = {
        key: this.newitem.key,
        "httpEndpoint": `${protocol}//${this.newitem.hostname}:${this.newitem.port}/graphql`,
        "wsEndpoint": `${wsprotocol}//${this.newitem.hostname}:${this.newitem.port}/subscriptions`,
        "schemaEndpoint": `${protocol}//${this.newitem.hostname}:${this.newitem.port}/schema`,
        "websocketsOnly": false,
        "name": this.newitem.name,
        "colorLight": "rgba(166,11,11,0.3)",
        "colorDark": "rgba(166,11,11,0.9)",
        "authToken": null
      }
      this.$store.commit('data/addApi', {key: data.key, data: data})
    }
  }
}
</script>
