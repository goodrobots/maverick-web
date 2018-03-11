<template lang='pug'>
transition(name="slide-y-transition" mode="out-in")
  v-toolbar(v-show="navState" fixed dense clipped-left :color="navColor" app)
    v-btn.pl-0.ml-0(flat disabled left small): img(src='static/img/logos/maverick-text-logo-dark.svg' height='75%')
    v-fade-transition(mode="out-in")
      v-toolbar-side-icon(v-if="navIcon" @click.stop="toggleDrawer")
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
  data () {
    return {
    }
  },
  computed: {
    routePath () { return this.$store.state.route.path },
    navState () { return this.$store.state.navState },
    navIcon () { return this.$store.state.navIcon },
    navColor () { return this.$store.state.navColor },
    navDrawer () { return this.$store.state.navDrawer },
    apis () { return this.$store.state.apis },
    activeApi () { return this.$store.state.activeApi }
  },
  methods: {
    changeApi (api) {
      this.$store.commit('setApi', api)
    },
    toggleDrawer () {
      this.$store.commit('setNavDrawer', !this.$store.state.navDrawer)
    }
  },
  name: 'TopNav'
}
</script>
