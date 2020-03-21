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
      queue: {}
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
    this.createConnection()
  },
  methods: {
    createConnection() {
      const url = 'ws://' + window.location.hostname + ':1234'

      /*
      const socket = io(url, {
        path: '/',
        transports: [ 'websocket' ]
      })
      var socket = io.connect(url, {
        path: '/',
        transports: [ 'websocket' ]
      });
      socket.on('connect', () => {
        console.log('socket connected: ' + socket.id);
      })
      socket.on('message', function (msg) {
        console.log('received message: ' + msg)
        console.log(msg)
      })
      */

      var ws = new WebSocket(url);
      ws.onopen = () => {
        this.logInfo("Connected to discovery service: " + url)
      }
      ws.onmessage = (evt) => {
        const data = JSON.parse(evt.data)
        this.logDebug(`Received new discovered service: ${data.name}`)
        this.queue[data.name] = data
      }
      
      /*
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
      */
    }
  }
}
</script>
