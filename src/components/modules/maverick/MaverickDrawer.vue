<template lang='pug'>
v-navigation-drawer(app left clipped floating v-model="drawer" :color="topColor")
  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Maverick Control
      v-list-item-subtitle
        span Services and Commands
  v-divider
  v-list.pt-0(dense nav)
    v-list-item.mt-3(@click="" to="/maverick/services")
      v-list-item-icon
        v-icon mdi-account-cog
      v-list-item-content
        v-list-item-title Services
    v-list-item(@click="" to="/maverick/commands")
      v-list-item-icon
        v-icon mdi-view-module
      v-list-item-content
        v-list-item-title Commands

  v-spacer

  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Maverick Configuration
      v-list-item-subtitle
        span Configuration and Settings
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="" to="/maverick/config")
      v-list-item-icon
        v-icon mdi-cloud-search
      v-list-item-content
        v-list-item-title Configuration
    v-list-item(@click="" to="/maverick/network")
      v-list-item-icon
        v-icon mdi-router-wireless-settings
      v-list-item-content
        v-list-item-title Networking

  v-spacer

  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Maverick Legacy
      v-list-item-subtitle
        span Legacy Services
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="" to="/maverick/legacy")
      v-list-item-icon
        v-icon mdi-cloud-search
      v-list-item-content
        v-list-item-title Legacy Services
</template>

<script>
export default {
  name: 'MaverickDrawer',
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
