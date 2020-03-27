<template lang='pug'>
div
  video-drawer
  v-content
    v-container(v-if="!Object.keys(videostreams).length")
      v-card.mx-auto.mt-2
        v-alert(border="left" outlined type="info")
          span No Video Streams are defined.  Please define a video stream in <v-btn class="ma-2" :color="navColor+' darken-2'" small to='/config/video'>Config->Video</v-btn>
    v-container(v-if="Object.keys(videostreams).length && !Object.keys(enabledStreams).length")
      v-card.mx-auto.mt-2
        v-alert(border="left" outlined type="info")
          span There are no enabled Video Streams.  Please enable a stream in <v-btn class="ma-2" :color="navColor+' darken-2'" small @click.stop="toggleDrawer">Stream Control</v-btn>
    v-container.pa-2(fluid)
        v-row(dense)
          v-col.px-4(v-for="stream in videostreams" :key='stream.key' v-if="stream.enabled" xs=12 sm=12 md=12 lg=6 xl=6)
            v-row(justify='center' wrap :ref="'layout-'+stream.key")
              v-card
                v-system-bar(color="primary" window)
                  span Video Stream: <strong>{{ stream.name }}</strong>
                v-card-text
                  v-chip.ma-2(v-if="streamStatus[stream.key]=='playing'" small color='success')
                    v-icon(left) mdi-check-circle
                    span Playing
                  v-chip.ma-2(v-else-if="streamStatus[stream.key]=='buffering' || stream.action == 'stop'" small color='amber')
                    v-icon(left) mdi-alert
                    span Buffering
                  v-chip.ma-2(v-else small color='error')
                    v-icon(left) mdi-alert-circle
                    span Stopped
                  span Bitrate
                    v-chip.ma-2(small color='primary') <strong>{{ cleanBitrate(statBitrate[stream.key]) }}</strong>
                  span Packet Loss
                    v-chip.ma-2(small color='error') <strong>{{ statPacketloss[stream.key] }}</strong>
                VideoStream(:config="{ url: stream.webrtcEndpoint }" :videostream="stream.key" :width="refWidth('layout-'+stream.key)" :stream="1" :action="stream.action" @status="updateStatus(stream.key, $event)" @packetloss="updatePacketloss(stream.key, $event)" @bitrate="updateBitrate(stream.key, $event)")
                // v-card-text
                  v-layout.d-flex.justify-space-between(flat)
                    // div
                      v-btn-toggle.ma-2(v-model="actionState" shaped mandatory dense)
                        v-btn(color='green' @click="stream.action='start'")
                          v-icon(left) mdi-play
                          span Start
                        v-btn(color='red' @click="stream.action='stop'")
                          v-icon(left) mdi-stop
                          span Stop
                  // span BitRate
                    v-btn-toggle.ma-2(v-model="bitrate" mandatory background-color='blue' active-class='blue' dense)
                      v-btn(value='128') 128K
                      v-btn(value='256') 256K
                      v-btn(value='512') 512K
                      v-btn(value='1024') 1M
                      v-btn(value='2048') 2M
                  // div
                    span Resolution
                    v-btn-toggle.ma-2(v-model="resolution" mandatory background-color='purple' active-class='purple' dense)
                      v-btn(value='480p') 480p
                      v-btn(value='720p') 720p
                      v-btn(value='1080p') 1080p
                      v-btn(value='2k') 2k
                      v-btn(value='4k') 4k
</template>

<script>
import VideoDrawer from './VideoDrawer'
import VideoStream from './VideoStream.vue'

export default {
  name: 'VideoModule',
  components: {
    VideoDrawer,
    VideoStream
  },
  data () {
    return {
      actionState: 'start',
      streamStatus: {'nano': null, 'raspberry': null},
      statBitrate: {'nano': null, 'raspberry': null},
      statPacketloss: {'nano': null, 'raspberry': null},
      bitrate: '256',
      resolution: '720p',
      activeStream: null,
      width: 500
    }
  },
  computed: {
    videostreams () {
      return this.$store.state.data.videostreams
    },
    enabledStreams () {
      let _enabled = {}
      for (const stream in this.videostreams) {
        if (this.videostreams[stream].enabled) {
          _enabled[this.videostreams[stream].key] = this.videostreams[stream]
        }
      }
      return _enabled
    }
  },
  watch: {
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.width = ((75 / 100) * window.innerWidth)
    })
  },
  methods: {
    updateStatus (key, $event) {
      if (!(this.streamStatus.hasOwnProperty(key))) {
        this.$set(this.streamStatus, key, $event)
      } else {
        this.streamStatus[key] = $event
      }
    },
    updateBitrate (key, $event) {
      if (!(this.statBitrate.hasOwnProperty(key))) {
        this.$set(this.statBitrate, key, $event)
      } else {
        this.statBitrate[key] = $event
      }
    },
    updatePacketloss (key, $event) {
      if (!(this.statPacketloss.hasOwnProperty(key))) {
        this.$set(this.statPacketloss, key, $event)
      } else {
        this.statPacketloss[key] = $event
      }
    },
    changeStream (stream) {
      this.activeStream = stream
    },
    cleanBitrate (bitrate) {
      if (bitrate / 1000 < 1000) {
        return Math.round(bitrate / 1000) + ' K'
      } else {
        return Math.round(bitrate / 1000000) + ' M'
      }
    },
    refWidth (el) {
      let width = null
      try {
        width = this.$refs[el][0].clientWidth
      } catch (err) {

      }
      return width
    },
    toggleDrawer () {
      this.$store.commit('core/setNavDrawer', true)
    }
  }
}
</script>

<style scoped>
</style>
