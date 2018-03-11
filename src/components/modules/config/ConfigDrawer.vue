<template lang='pug'>
v-navigation-drawer(app clipped fixed v-model="drawer")
  v-list(dense)
    v-subheader.mt-3.grey--text.text--darken-1 FLIGHT CONTROLLER
    v-list-tile.mt-3(@click="" to="/config/parameter-summary")
      v-list-tile-action
        v-icon dashboard
      v-list-tile-title Summary
    v-list-tile(@click="" to="/config/parameter-groups")
      v-list-tile-action
        v-icon view_list
      v-list-tile-title Parameter Groups
    v-list-tile(@click="" to="/config/parameter-list")
      v-list-tile-action
        v-icon filter_list
      v-list-tile-title Parameter List
</template>

<script>
export default {
  name: 'ConfigDrawer',
  data () {
    return {
    }
  },
  computed: {
    drawer: {
      get () { return this.$store.state.navDrawer },
      set (value) { this.$store.commit('setNavDrawer', value) }
    }
  }
}
</script>
