<template lang='pug'>
div
  v-data-iterator(:items="items" item-key="key" hide-default-footer :single-expand="expand")

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
        v-col(v-for="item in items" :key="item.key" cols="12" sm="12" md="12" lg="12")
          v-card
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline
                  span {{ item.name }}
              div
                v-switch.pl-4(:color="navColor" :input-value="isExpanded(item)" label="Edit" @change="(v) => expand(item, v)")
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
              v-btn.ml-2(color='blue') Test

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
              v-text-field(v-model="newitem.webrtcEndpoint" label="WebRTC Endpoint" required)
      v-divider
      v-card-actions
        v-btn.ma-2(color="green" @click="createStream()") Create Stream
        v-btn.ma-2(color="grey" @click="dialog = false") Cancel
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
      newitem: {},
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
      // If any of the endpoints have changed, destroy and recreate the client
      // this.deleteQueries(apiData.key)
      // delete this.$apollo.provider.clients[apiData.key]
      // this.createClient(apiData.key+'new', apiData)
    },
    createStream() {
      this.dialog = false // Close dialog
      this.logDebug('Creating new video stream: ' + this.newitem.key)
      this.$store.commit('data/addVideoStream', {key: this.newitem.key, data: this.newitem})
    }
  }
}
</script>
