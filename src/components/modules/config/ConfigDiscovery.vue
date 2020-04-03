<template lang='pug'>
div
  v-data-iterator(:items="items" item-key="host" hide-default-footer :single-expand="expand")

    template(v-slot:header)
      v-toolbar.mb-1(color="primary lighten-1" dense)
        v-toolbar-title Discovery Agents
        v-spacer
        // v-text-field(v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search")
        v-spacer
        v-btn(@click.stop="dialog = true" color="primary")
          v-icon(left) mdi-plus-box
          span Add Discovery Agent
    
    template(v-slot:no-data)
      v-alert.ma-8(border="left" outlined type="primary")
        span No Discovery Agents are defined.
          v-btn.ml-2(@click.stop="dialog = true" :color="navColor+' darken-2'" small)
            span Add Discovery Agent

    template(v-slot:default="{ items, isExpanded, expand }")
      v-row
        v-col(v-for="item in items" :key="item.host" cols="12" sm="12" md="12" lg="12")
          v-card
            v-toolbar(dense)
              v-toolbar-title
                span {{ item.host }}
                // v-chip.ma-2(v-if="isDiscoveryReady(item.host)" color='success' small)
                  v-icon(left) mdi-check-circle
                  span Connected
                // v-chip.ma-2(v-else color='error' small)
                  v-icon(left) mdi-alert-circle
                  span Not Connected
              v-spacer
              v-switch.mt-4(:color="navColor" :input-value="isExpanded(item)" :label="isExpanded(item) ? 'Editing' : 'Edit'" @change="(v) => expand(item, v)")
            v-list(v-if="isExpanded(item)" dense)
              v-list-item
                v-list-item-content
                  v-text-field(v-model="item.host" label="Discovery Hostname")
                v-list-item-content.align-end
              v-list-item
                v-list-item-content
                  v-text-field(v-model="item.ws_url" label="Non-encrypted Agent URL")
                v-list-item-content.align-end
              v-list-item
                v-list-item-content
                  v-text-field(v-model="item.wss_url" label="Encrypted Agent URL")
                v-list-item-content.align-end
              v-list-item
                v-btn(color='success' @click="save(item)") Save
                // v-btn.ml-4(color='blue') Test
                v-spacer
                v-btn(color='error' @click="remove(item)")
                  v-icon(left) mdi-delete
                  span Delete

  v-dialog(v-model="dialog" max-width="600px")
    v-card
      v-card-title.headline(class="primary" primary-title)
        v-icon(left) mdi-plus-box
        span Add Discovery Agent
      v-card-text
        v-container
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.host" label="Hostname" required)
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.port" value=1234 label="Port" hint="Default discovery port is 1234" required)
      v-card-actions
        v-btn.ma-2(color="success" @click="createAgent()") Create Discovery Agent
        v-btn.ma-2(color="error" @click="dialog = false") Cancel

  v-dialog(v-if="deleteitem" v-model="deleteDialog" max-width="400")
    v-card
      v-card-title
        span.headline.red--text Delete Agent: <strong>{{ deleteitem.host }}</strong>?
      v-card-text
        h3 {{ deleteitem.host }}
        div Are you sure you want to delete this Discovery Agent?
      v-card-actions
        v-spacer
        v-btn(text @click="deleteDialog = false") Cancel
        v-btn(text color="red darken-1" @click="removeAgent()") Delete
</template>

<script>
export default {
  name: "ConfigDiscovery",
  components: {
  },
  data() {
    return {
      search: '',
      filter: {},
      dialog: false,
      deleteDialog: false,
      newitem: {},
      deleteitem: null,
      expand: true
    }
  },
  computed: {
    items () {
      return Object.values(this.$store.state.data.discoveries)
    }
  },
  methods: {
    save(agentData) {
      this.$store.commit('data/updateDiscovery', {key: agentData.host, data: agentData})
    },
    createAgent() {
      this.dialog = false // Close dialog
      this.logDebug('Creating new discovery agent: ' + this.newitem.host)
      const protocol = 'ws'
      let data = {
        host: this.newitem.host,
        port: this.newitem.port,
        url: `${protocol}://${this.newitem.host}:${this.newitem.port}`
      }
      this.$store.commit('data/addDiscovery', {key: data.host, data: data})
    },
    remove(item) {
      this.deleteitem = item
      this.deleteDialog = true
    },
    removeAgent() {
      this.logDebug('Deleting agent: ' + this.deleteitem.host)
      this.$store.commit('data/removeDiscovery', this.deleteitem.host)
      this.deleteitem = null
    }
  }
}
</script>
