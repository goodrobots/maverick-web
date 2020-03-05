<template lang='pug'>
v-content
  v-container
    v-card.mx-auto
      v-toolbar(:color="navColor" dense)
        v-toolbar-title Video Streams
      v-item-group
        v-container
          v-row
            v-col(v-for="stream in videostreams" :key="stream.key" cols="12" md="6")
              v-item(v-slot:default="{ active, toggle }")
                v-card.d-flex.align-center(:color="active ? navColor : ''" height="100" @click="changeStream(stream)")
                  v-scroll-y-transition
                    div.display-2.flex-grow-1.text-center(v-if="active")
                      div {{ stream.name }}
                      div Active
                    div.display-1.flex-grow-1.text-center(v-else)
                      div {{ stream.name }}
          v-alert(v-if="!Object.keys(videostreams).length" outlined border="left" type="warning")
            span No Video Streams are defined.  Please define a video stream in Config->Video
  v-container(fluid grid-list-xl)
    v-layout(align-center justify-space-around column)
      v-flex(xs12)
        v-layout(justify-center wrap)
          v-card(v-if='activeStream')
            v-system-bar(:color="navColor" window)
              span Video Stream: {{ activeStream.name }}
            v-card-text
              v-chip.ma-2(v-if="streamStatus=='playing'" color='green')
                v-icon(left) mdi-check-circle
                span Playing
              v-chip.ma-2(v-else-if="streamStatus=='buffering'" color='amber')
                v-icon(left) mdi-alert
                span Buffering
              v-chip.ma-2(v-else color='red')
                v-icon(left) mdi-alert-circle
                span Stopped
              span Bitrate
                v-chip.ma-2(color='blue') <strong>{{ cleanBitrate }}</strong>
              span Packet Loss
                v-chip.ma-2(color='red') <strong>{{ statPacketloss }}</strong>
            v-container
              VideoStream(:config="{ url: activeStream.webrtcEndpoint }" :key="activeStream.key" :width="width" :stream="1" @status="streamStatus = $event" @bitrate="statBitrate = $event" @packetloss="statPacketloss = $event")
            v-card-text
              v-layout.d-flex.justify-space-between(flat)
                div
                  v-btn-toggle.ma-2(v-model="actionState" shaped mandatory dense)
                    v-btn(color='green' value='start')
                      v-icon(left) mdi-play
                      span Start
                    v-btn(color='red' value='stop')
                      v-icon(left) mdi-stop
                      span Stop
                // div
                  span BitRate
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
      streamStatus: null,
      statBitrate: null,
      statPacketloss: null,
      bitrate: '256',
      resolution: '720p',
      activeStream: null,
      width: ((75 / 100) * window.innerWidth)
    }
  },
  computed: {
    cleanBitrate () {
      if (this.statBitrate / 1000 < 1000) {
        return Math.round(this.statBitrate / 1000) + ' K'
      } else {
        return Math.round(this.statBitrate / 1000000) + ' M'
      }
    },
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
    changeStream (stream) {
      this.activeStream = stream
    }
  }
}
</script>

<style scoped>
</style>
