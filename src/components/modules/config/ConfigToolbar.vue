<template lang='pug'>
v-toolbar(fixed dense clipped-left :color="navColor" app)
  v-toolbar-side-icon(@click.stop="drawer = !drawer")
  v-toolbar-title(v-text="appTitle")
  v-icon.ml-3 fa-youtube
  v-spacer
  v-toolbar-items
    v-menu(offset-y)
      v-btn(flat slot="activator", v-text="activeApi")
      v-list
        v-list-tile(v-for="(api, key) in apis" :key="api" @click='changeApi(key)')
          v-list-tile-title(v-text="api")
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    appTitle () { return this.$store.state.appTitle },
    navColor () { return this.$store.state.navColor },
    drawer: {
      get () { return this.$store.state.configDrawer },
      set (value) { this.$store.commit('setConfigDrawer', value) }
    },
    apis () { return this.$store.state.apis },
    activeApi () { return this.$store.state.activeApi }
  },
  methods: {
    changeApi (api) {
      this.$store.commit('setApi', api)
    }
  }
}
</script>