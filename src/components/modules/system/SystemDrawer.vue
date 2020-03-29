<template lang='pug'>
v-navigation-drawer(app left clipped floating v-model="drawer" :color="topColor")
  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span System Control
      v-list-item-subtitle
        span Services and Console
  v-divider
  v-list.pt-0(dense nav)
    v-list-item.mt-3(@click="" to="/system/services")
      v-list-item-icon
        v-icon mdi-webhook
      v-list-item-content
        v-list-item-title Services
    v-list-item(@click="" to="/system/console")
      v-list-item-icon
        v-icon mdi-keyboard
      v-list-item-content
        v-list-item-title Console

  v-spacer

  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span System Configuration
      v-list-item-subtitle
        span Configuration and Settings
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="")
      v-list-item-icon
        v-icon mdi-cog-outline
      v-list-item-content
        v-list-item-title Configuration
    v-list-item(@click="")
      v-list-item-icon
        v-icon mdi-access-point-network
      v-list-item-content
        v-list-item-title Networking

  v-spacer

  v-list-item.mt-4
    v-list-item-content
      v-list-item-title.title
        span Legacy Services
      v-list-item-subtitle
        span Legacy Services
  v-divider
  v-list.pt-0(dense nav)
    v-list-item(@click="" to="/system/legacy")
      v-list-item-icon
        v-icon mdi-link
      v-list-item-content
        v-list-item-title Legacy Services
</template>

<script>
export default {
  name: 'SystemDrawer',
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
