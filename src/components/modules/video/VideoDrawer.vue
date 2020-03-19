<template lang='pug'>
v-navigation-drawer(app left clipped floating v-model="drawer" :color="navColor+' darken-3'")
  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        v-row
          v-col
            span Video Streams
          v-col
            v-btn(to='/config/video' :color="navColor+' darken-3'" small)
              v-icon mdi-cog-outline
      v-list-item-subtitle
        span Stream Control
  v-divider
  v-list(flat three-line)
    v-list-item(v-for="stream in videostreams" :key="stream.key")
      template(v-slot:default="{ active }")
        v-list-item-action
          v-switch(color='green' v-model='stream.enabled')
        v-list-item-content
          v-list-item-title {{ stream.name }}
          v-list-item-subtitle {{ stream.webrtcEndpoint }}
          //v-alert(v-if="!Object.keys(videostreams).length" border="left" type="warning")
            span No Video Streams are defined.  Please define a video stream in <v-btn small to='/config/video'>Config->Video</v-btn>

</template>

<script>
export default {
  name: 'VideoDrawer',
  data () {
    return {}
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.core.navDrawer
      },
      set (value) {
        this.$store.commit('core/setNavDrawer', value)
      }
    },
    videostreams () {
      return this.$store.state.data.videostreams
    }
  },
  mounted () {
  }
}
</script>
