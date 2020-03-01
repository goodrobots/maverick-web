<template lang='pug'>
  video.ma2.pa0(id="videostream" controls autoPictureInPicture=true muted=true preload="none" poster="/img/placeholders/video-placeholder.png" :width="width")
</template>

<script>
/* Note: you may need to add `externals: { ws: "WebSocket"},` to Your webpack configuration for this to work properly */
import { Janus, StreamingJanusPlugin } from '@techteamer/janus-api'

export default {
  props: {
    config: {
      type: Object,
      default: null
    },  
    stream: {
      type: Number,
      default: null
    },
    width: {
      type: Number,
      default: 500
    }
  },

  data () {
    return {
      lastStats: null
    }
  },

  beforeDestroy () {
    clearInterval(this.bitrateInterval)
    clearInterval(this.bufferingInterval)
  },
  
  mounted () {
    let janus = this.janus = new Janus(this.config, console)
    let streaming = new StreamingJanusPlugin(console, false)
    let peerConnection = new RTCPeerConnection()
    let bitrate = 0
    let packetloss = 0
    this.bitrateInterval = setInterval(() => {

    let selector = peerConnection.getReceivers().find(({kind}) => kind == "video");
    peerConnection.getStats(selector).then((stats => stats.forEach(entry => {
        if (entry.type == "inbound-rtp") {
          if (this.lastStats) {
            packetloss = entry.packetsLost
            bitrate = ((entry.bytesReceived - this.lastStats.bytesReceived) / (entry.lastPacketReceivedTimestamp - this.lastStats.lastPacketReceivedTimestamp))
          }
          this.lastStats = entry
        }
      })))
      this.$emit('bitrate', bitrate)
      this.$emit('packetloss', packetloss)
    }, 1000)

    this.$emit('status', 'init')
    janus.connect().then(() => {
      return janus.addPlugin(streaming)
    }).then(() => {
      // console.info('plugin added', janus)
      peerConnection.onicecandidate = (event) => {
        // console.log('@onicecandidate', event)
        if (!event.candidate || !event.candidate.candidate) {
          streaming.candidate({completed: true})
        } else {
          streaming.candidate({
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex
          })
        }
      }
      peerConnection.onaddstream = (mediaStreamEvent) => {
        let videoElement = document.getElementById('videostream')
        videoElement.srcObject = mediaStreamEvent.stream
        videoElement.play()
        if (this.bufferingInterval == undefined) {
          let lastPosition = 0
          this.bufferintInterval = setInterval(() => {
            if (lastPosition == videoElement.currentTime && !videoElement.paused) {
              this.$emit('status', 'buffering')
            } else {
              this.$emit('status', 'playing')
            }
            lastPosition = videoElement.currentTime
          }, 500)
        }
      }
      // streaming.on('webrtcState', (a, b) => { console.log('webrtcState', a, b) })
      // streaming.on('mediaState', (a, b) => { console.log('mediaState', a, b) })
      streaming.on('statusChange', (status) => {
        // console.log('statusChange', status)
        this.$emit('status', status)
      })
      return streaming.watch(this.stream)
    }).then((jsep) => {
      return peerConnection.setRemoteDescription(new RTCSessionDescription(jsep))
    }).then(() => {
      // console.log('remoteDescription set')
      return peerConnection.createAnswer({offerToReceiveAudio: true, offerToReceiveVideo: true})
    }).then(answer => {
      // console.log('answerCreated', answer)
      peerConnection.setLocalDescription(answer)
      return streaming.start(answer)
    }).then(({body, json}) => {
      // console.log('START', body, json)
    })
  },

  methods: {

  }
}
</script>