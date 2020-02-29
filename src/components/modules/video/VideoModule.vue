<template lang='pug'>
v-content
  v-container(fluid grid-list-xl fill-height)
    v-layout(align-center justify-space-around column)
      v-flex(xs12)
        v-spacer
          v-content
      v-flex(xs12)
        v-layout(justify-center wrap)
          v-card()
            v-system-bar(:color="navColor" window)
              span Realtime Video Stream
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
              VideoStream(:config="{ url: 'wss://maverick-raspberry.local:6796' }" :width="width" :stream="1" @status="streamStatus = $event" @bitrate="statBitrate = $event" @packetloss="statPacketloss = $event")
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
                div
                  span BitRate
                  v-btn-toggle.ma-2(v-model="bitrate" mandatory background-color='blue' active-class='blue' dense)
                    v-btn(value='128') 128K
                    v-btn(value='256') 256K
                    v-btn(value='512') 512K
                    v-btn(value='1024') 1M
                    v-btn(value='2048') 2M

                div
                  span Resolution
                  v-btn-toggle.ma-2(v-model="resolution" mandatory background-color='purple' active-class='purple' dense)
                    v-btn(value='480p') 480p
                    v-btn(value='720p') 720p
                    v-btn(value='1080p') 1080p
                    v-btn(value='2k') 2k
                    v-btn(value='4k') 4k
      v-flex(xs12)
        v-spacer
          v-content
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
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.width = ((75 / 100) * window.innerWidth)
    })
  }
}
</script>

<style scoped>
</style>
