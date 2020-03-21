<template lang='pug'>
v-navigation-drawer(app left clipped floating v-model="drawer" :color="navColor+' darken-4'")
  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Maverick Web
      v-list-item-subtitle
        span General Settings
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="" to="/config/video")
      v-list-item-icon
        v-icon mdi-video
      v-list-item-content
        v-list-item-title Video Streams
    v-list-item.mt-3(@click="" to="/config/modules")
      v-list-item-icon
        v-icon mdi-view-module
      v-list-item-content
        v-list-item-title Web Modules

  v-spacer

  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Maverick API
      v-list-item-subtitle
        span API Settings
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="" to="/config/discovery")
      v-list-item-icon
        v-icon mdi-cloud-search
      v-list-item-content
        v-list-item-title Discovery
    v-list-item(@click="" to="/config/connections")
      v-list-item-icon
        v-icon mdi-router-wireless-settings
      v-list-item-content
        v-list-item-title API Connections

  v-spacer

  // template(v-if="activeApi")
    v-list-item
      v-list-item-content
        v-list-item-subtitle
          span Autopilot Settings
    v-divider
    v-list(dense nav)
      v-list-item(@click="" to="/config/parameter-summary")
        v-list-item-action
          v-icon mdi-view-dashboard
        v-list-item-title Summary
      // v-list-item(@click="" to="/config/parameter-groups")
        v-list-item-action
          v-icon mdi-view-list
        v-list-item-title Parameter Groups
      v-list-item(@click="" to="/config/parameter-list")
        v-list-item-action
          v-icon mdi-view-list
        v-list-item-title Parameter List
</template>

<script>
export default {
  name: 'ConfigDrawer',
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
    }
  },
  mounted () {
  }
}
</script>
