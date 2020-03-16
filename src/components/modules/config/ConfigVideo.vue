<template lang='pug'>
div
  v-data-iterator(:items="items" item-key="name" hide-default-footer :single-expand="expand")

    template(v-slot:header)
      v-toolbar.mb-1(:color="navColor" dark flat)
        v-toolbar-title Video Streams
        v-spacer
        v-text-field(v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search")
        v-spacer
        v-btn(light @click.stop="dialog = true")
          v-icon(left) mdi-plus-box
          span Add Video Stream
    
    template(v-slot:default="{ items, isExpanded, expand }")
      v-row
        v-col(v-for="item in items" :key="item.name" cols="12" sm="12" md="12" lg="12")
          v-card
            v-toolbar
              v-toolbar-title {{ item.name }}
              v-spacer
              v-switch.mt-4(:color="navColor" :input-value="isExpanded(item)" :label="isExpanded(item) ? 'Editing' : 'Edit'" @change="(v) => expand(item, v)")
          v-list(v-if="isExpanded(item)" dense)
            v-list-item
              v-divider
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.name" label="Stream Name/Description")
              v-list-item-content.align-end
            v-list-item
              v-list-item-content
                v-text-field(v-model="item.webrtcEndpoint" label="WebRTC Endpoint")
              v-list-item-content.align-end
            v-list-item
              v-divider
            v-list-item
              v-btn(color='green' @click="save(item)") Save
              v-btn.ml-4(color='blue') Test
              v-spacer
              v-btn(color='red' @click="remove(item)")
                v-icon(left) mdi-delete
                span Delete

  v-dialog(v-model="dialog" max-width="600px")
    v-card
      v-card-title.headline(:class="navColor" primary-title)
        v-icon(left) mdi-plus-box
        span Add Video Stream
      v-card-text
        v-container
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.key" label="Stream Key (Short)" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.name" label="Stream Name/Description" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.hostname" label="Hostname (FQDN) / IP Address" required)
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.port" label="Port" hint="Maverick default port is 6796" required)
      v-divider
      v-card-actions
        v-btn.ma-2(color="green" @click="createStream()") Create Stream
        v-btn.ma-2(color="grey" @click="dialog = false") Cancel

  v-dialog(v-if="deleteitem" v-model="deleteDialog" max-width="400")
    v-card
      v-card-title
        span.headline.red--text Delete Stream: <strong>{{ deleteitem.key }}</strong>?
      v-card-text
        h3 {{ deleteitem.name }}
        div Are you sure you want to delete this video stream?
      v-card-actions
        v-spacer
        v-btn(text @click="deleteDialog = false") Cancel
        v-btn(text color="red darken-1" @click="removeStream()") Delete
</template>

<script>
export default {
  name: "ConfigVideo",
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
      return Object.values(this.$store.state.data.videostreams)
    }
  },
  methods: {
    save(streamData) {
      this.$store.commit('data/updateVideoStream', {key: streamData.key, data: streamData})
    },
    createStream() {
      this.dialog = false // Close dialog
      this.logDebug('Creating new video stream: ' + this.newitem.key)
      const protocol = 'wss'
      let data = {
        key: this.newitem.key,
        name: this.newitem.name,
        webrtcEndpoint: `${protocol}://${this.newitem.hostname}:${this.newitem.port}`,
        enabled: false
      }
      this.$store.commit('data/addVideoStream', {key: data.key, data: data})
    },
    remove(item) {
      this.deleteitem = item
      this.deleteDialog = true
    },
    removeStream() {
      this.logDebug('Deleting stream: ' + this.deleteitem.key)
      this.$store.commit('data/removeVideoStream', this.deleteitem.key)
      this.deleteitem = null
    }
  }
}
</script>
