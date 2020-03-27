<template lang='pug'>
v-navigation-drawer(app left clipped floating v-model="drawer" :color="topColor")
  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        v-row
          v-col
            span Video Streams
          v-col
            v-btn(to='/config/video' color="primary" small)
              v-icon mdi-cog-outline
      v-list-item-subtitle
        span Stream Control
  v-divider
  v-list(v-if="Object.keys(videostreams).length" flat three-line)
    v-list-item(v-for="stream in videostreams" :key="stream.key")
      template(v-slot:default="{ active }")
        v-list-item-action
          v-switch(color='primary' v-model='stream.enabled')
        v-list-item-content
          v-list-item-title {{ stream.name }}
          v-list-item-subtitle {{ stream.webrtcEndpoint }}
  v-list(v-else)
    v-list-item
      v-list-item-content
        v-alert(outlined type="info")
          span No Video Streams are defined.

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
