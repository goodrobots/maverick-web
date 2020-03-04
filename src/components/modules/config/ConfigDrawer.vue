<template lang='pug'>
v-navigation-drawer(app left clipped fixed v-model="drawer")
  v-list(dense)
    v-subheader.mt-3.grey--text.text--darken-1 GENERAL CONFIG
    v-list-item.mt-3(@click="" to="/config/connections")
      v-list-item-action
        v-icon mdi-transit-connection
      v-list-item-title Connections
    v-list-item.mt-3(@click="" to="/config/modules")
      v-list-item-action
        v-icon mdi-view-module
      v-list-item-title Modules
    v-list-item.mt-3(@click="" to="/config/video")
      v-list-item-action
        v-icon mdi-video
      v-list-item-title Video

  v-list(v-if="activeApi" dense)
    v-subheader.mt-3.grey--text.text--darken-1 FLIGHT CONTROLLER
    v-list-item.mt-3(@click="" to="/config/parameter-summary")
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
        return this.$store.state.data.navDrawer
      },
      set (value) {
        this.$store.commit('data/setNavDrawer', value)
      }
    }
  },
  mounted () {
  }
}
</script>
