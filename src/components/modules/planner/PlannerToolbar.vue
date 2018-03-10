<template lang='pug'>
v-toolbar(fixed dense clipped-left :color="navColor" app)
  v-btn(flat disabled left small): img(src='static/img/logos/maverick-text-logo-dark.svg' height='75%')
  v-spacer
  v-toolbar-items
    v-menu(offset-y)
      v-btn(flat slot="activator", v-text="apis[activeApi]")
      v-list
        v-list-tile(v-for="(api, key) in apis" :key="api" @click='changeApi(key)')
          v-list-tile-title(v-text="api")
</template>

<script>
export default {
  computed: {
    appTitle () { return this.$store.state.appTitle },
    navColor () { return this.$store.state.navColor },
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