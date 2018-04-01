<template lang='pug'>
v-card.transparent.navfab

  v-speed-dial.navfab(v-model="navfab" direction="top" bottom=true right=true open-on-hover=false transition="slide-y-reverse-transition")
    v-btn(slot="activator" :color="navColor" dark fab hover v-model="navfab")
      v-icon(v-html="navIcon")
      v-icon close
    v-btn(v-if="(moduleName !== 'analysis')" fab dark :small="(moduleName !== 'analysis')" color="mavgreen" to="/analysis")
      v-icon equalizer
    v-btn(v-if="(moduleName !== 'config')" fab dark :small="(moduleName !== 'config')" color="mavpurple" to="/config")
      v-icon settings
    v-btn(v-if="(moduleName !== 'planner')" fab dark :small="(moduleName !== 'planner')" color="mavorange" to="/planner")
      v-icon explore
    v-btn(v-if="(moduleName !== 'cockpit')" fab dark :small="(moduleName !== 'cockpit')" color="mavblue" to="/cockpit")
      v-icon flight_takeoff
    // v-divider
    // v-btn(fab dark small :color="(navState) ? navColor : 'grey'" @click="toggleNavState")
      v-icon(v-if="navState") swap_vert
      v-icon(v-else) swap_horiz
    // v-btn(fab dark small :color="(fullScreen) ? navColor : 'grey'" @click="toggleFullScreen")
      v-icon(v-if="fullScreen") fullscreen
      v-icon(v-else) fullscreen_exit

  v-speed-dial.navfab(v-model="navfab" direction="left" bottom=true right=true open-on-hover=false transition="slide-y-reverse-transition")
    v-btn(slot="activator" :color="navColor" dark fab hover v-model="navfab")
      v-icon(v-html="navIcon")
      v-icon close
    v-btn(fab dark small :color="(navState) ? navColor : 'grey'" @click="toggleNavState")
      v-icon(v-if="navState") swap_vert
      v-icon(v-else) swap_horiz
    v-btn(fab dark small :color="(fullScreen) ? navColor : 'grey'" @click="toggleFullScreen")
      v-icon(v-if="fullScreen") fullscreen
      v-icon(v-else) fullscreen_exit

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
    navState () { return this.$store.state.navState },
    navColor () { return this.$store.state.navColor },
    fullScreen () { return this.$store.state.fullScreen },
    moduleName () { return this.$store.state.moduleName },
    navIcon () {
      switch (this.moduleName) {
        case 'cockpit': return 'flight_takeoff'
        case 'planner': return 'explore'
        case 'config': return 'settings'
        case 'analysis': return 'equalizer'
      }
    }
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
    bottom: 25px;
    right: 25px;
  }

  .navfab .btn--floating {
    position: relative;
  }
</style>