<template lang='pug'>
div
</template>

<script>
import io from "socket.io-client";

export default {
  name: "ConfigDiscovery",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    items () {
      return {
        'default': window.location.host
      }
    }
  },
  mounted () {
    // this.createConnection()
  },
  methods: {
    createConnection () {
      const url = 'ws://' + window.location.hostname + ':1234'

      var ws = new WebSocket(url);
      ws.onopen = () => {
        this.logInfo("Connected to discovery service: " + url)
      }
      ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data)
        // this.logDebug(`Received new discovered service: ${data.name}`)
        if (data.service_type == "maverick-api") {
          this.createApi(data)
        }
        if (data.service_type == "webrtc") {
          this.createVideo(data)
        }
      }
    },
    createApi (data) {
      if (!this.apis[data.uuid] && data.service_type == 'maverick-api') {
        this.logInfo(`Creating new API connection from discovered service: ${data.name}`)
        let apidata = {
          key: data.uuid,
          "httpEndpoint": data.httpEndpoint,
          "wsEndpoint": data.wsEndpoint,
          "schemaEndpoint": data.schemaEndpoint,
          "websocketsOnly": data.websocketsOnly,
          "name": data.name,
          "colorLight": "rgba(166,11,11,0.3)",
          "colorDark": "rgba(166,11,11,0.9)",
          "authToken": null
        }
        this.$store.commit('data/addApi', {key: apidata.key, data: apidata})
        this.$toast.info(`Created new API connection from discovery: <strong>${data.name}</strong>`)
      }
    },
    createVideo (data) {
      if (!this.$store.state.data.videostreams[data.uuid] && data.service_type == 'webrtc') {
        this.logInfo(`Creating new Video stream from discovered service: ${data.name}`)
        let videodata = {
          key: data.uuid,
          name: data.name,
          webrtcEndpoint: data.wsEndpoint,
          enabled: false,
          action: 'start'
        }
        this.$store.commit('data/addVideoStream', {key: videodata.key, data: videodata})
        this.$toast.info(`Created new Video Stream from discovery: <strong>${data.name}</strong>`)
      }
    }
  }
}
</script>
