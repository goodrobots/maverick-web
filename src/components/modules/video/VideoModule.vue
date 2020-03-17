<template lang='pug'>
v-content

  v-container
    v-card.mx-auto
      v-toolbar(:color="navColor" dense)
        v-toolbar-title Video Streams
        v-spacer
        v-btn(to='/config/video' :color="navColor")
          v-icon(left) mdi-plus
          span configure
      v-container(fluid)
        v-row(dense)
          v-col(v-for="stream in videostreams" :key="stream.key" xs=12 sm=12 md=6 lg=6 xl=6)
            v-card(raised).mx-auto
              v-card-title.headline
                span {{ stream.name }}
                v-spacer
                v-switch(color='green' v-model='stream.enabled' :label="(stream.enabled) ? 'Enabled' : 'Disabled'")               
        v-alert(v-if="!Object.keys(videostreams).length" outlined border="left" type="warning")
          span No Video Streams are defined.  Please define a video stream in <v-btn to='/config/video'>Config->Video</v-btn>

  v-container(fluid)
      v-row(dense)

        v-col(v-for="stream in videostreams" :key='stream.key' v-if="stream.enabled" xs=12 sm=12 md=12 lg=6 xl=6)
          v-layout(justify-center wrap :ref="'layout-'+stream.key")
            v-card.mx-auto()
              v-system-bar(:color="navColor" window)
                span Video Stream: {{ stream.name }}
              v-card-text
                v-chip.ma-2(v-if="streamStatus[stream.key]=='playing'" color='green')
                  v-icon(left) mdi-check-circle
                  span Playing
                v-chip.ma-2(v-else-if="streamStatus[stream.key]=='buffering' || stream.action == 'stop'" color='amber')
                  v-icon(left) mdi-alert
                  span Buffering
                v-chip.ma-2(v-else color='red')
                  v-icon(left) mdi-alert-circle
                  span Stopped
                span Bitrate
                  v-chip.ma-2(color='blue') <strong>{{ cleanBitrate(statBitrate[stream.key]) }}</strong>
                span Packet Loss
                  v-chip.ma-2(color='red') <strong>{{ statPacketloss[stream.key] }}</strong>
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
import VideoStream from './VideoStream.vue'

export default {
  name: 'VideoModule',
  components: {
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
      // console.log(bitrate)
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
    }
  }
}
</script>

<style scoped>
</style>
