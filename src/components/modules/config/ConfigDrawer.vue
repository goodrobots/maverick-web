<template lang='pug'>
v-navigation-drawer(app clipped fixed v-model="drawer")
  v-list(dense)
    v-subheader.mt-3.grey--text.text--darken-1 FLIGHT CONTROLLER
    v-list-tile.mt-3(@click="" to="/config/parameter-summary")
      v-list-tile-action
        v-icon(color="grey darken-1") dashboard
      v-list-tile-title.grey--text.text--darken-1 Summary
    v-list-tile(@click="" to="/config/parameter-groups")
      v-list-tile-action
        v-icon(color="grey darken-1") view_list
      v-list-tile-title.grey--text.text--darken-1 Parameter Groups
    v-list-tile(@click="" to="/config/parameter-list")
      v-list-tile-action
        v-icon(color="grey darken-1") filter_list
      v-list-tile-title.grey--text.text--darken-1 Parameter List
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
      get () { return this.$store.state.configDrawer },
      set (value) { this.$store.commit('setConfigDrawer', value) }
    }
  }
}
</script>
