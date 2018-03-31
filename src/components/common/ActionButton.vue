<template lang='pug'>
v-card.transparent.navfab
  v-speed-dial.navfab(v-model="navfab", direction="top", bottom=true, right=true, open-on-hover=false, transition="slide-y-reverse-transition")
    v-btn(slot="activator", :color="navColor", dark, fab, hover, v-model="navfab")
      v-icon aspect_ratio
      v-icon close
    v-btn(fab, dark, small, :color="(navState) ? navColor : 'grey'" @click.stop="toggleNavState" transition)
      v-icon(v-if="navState" transition) swap_vert
      v-icon(v-else transition) swap_horiz
    v-btn(fab, dark, small, :color="(fullScreen) ? navColor : 'grey'" @click.stop="toggleFullScreen" transition)
      v-icon(v-if="fullScreen" transition) fullscreen
      v-icon(v-else transition) fullscreen_exit
</template>

<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)

export default {
  data () {
    return {
      navfab: false
    }
  },
  computed: {
    routePath () { return this.$store.state.route.path },
    navState () { return this.$store.state.navState },
    navColor () { return this.$store.state.navColor },
    fullScreen () { return this.$store.state.fullScreen }
  },
  methods: {
    toggleNavState () {
      this.$store.commit('setNavState', !this.navState)
    },
    toggleFullScreen () {
      this.$store.commit('setFullScreen', !this.fullScreen)
      this.$fullscreen.toggle(document.querySelector('#fullscreen'), {
        wrap: true
      })
    }
  }
}
</script>

<style>
  .navfab .speed-dial {
    position: absolute;
    bottom: 70px;
    right: 70px;
    z-index: 1000;
  }

  .navfab .btn--floating {
    position: relative;
  }
</style>