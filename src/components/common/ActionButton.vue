<template lang='pug'>
v-card.transparent.navfab

  v-speed-dial.navfab(v-model="navfab" direction="top" bottom=true right=true open-on-hover=false transition="slide-y-reverse-transition")
    v-btn(slot="activator" :color="navColor" dark fab hover v-model="navfab")
      v-icon(v-html="navIcon")
      v-icon close
    v-tooltip(v-if="(moduleName !== 'analysis')" left)
      v-btn( fab dark :small="(moduleName !== 'analysis')" color="mavgreen" to="/analysis" slot="activator")
        v-icon equalizer
      span Analysis
    v-tooltip(v-if="(moduleName !== 'config')" left)
      v-btn(fab dark :small="(moduleName !== 'config')" color="mavpurple" to="/config" slot="activator")
        v-icon settings
      span Configuration
    v-tooltip(v-if="(moduleName !== 'planner')" left)
      v-btn(fab dark :small="(moduleName !== 'planner')" color="mavorange" to="/planner" slot="activator")
        v-icon explore
      span Planner
    v-tooltip(v-if="(moduleName !== 'cockpit')" left)
      v-btn(fab dark :small="(moduleName !== 'cockpit')" color="mavblue" to="/cockpit" slot="activator")
        v-icon flight_takeoff
      span Cockpit
    // v-divider
    // v-btn(fab dark small :color="(navState) ? navColor : 'grey'" @click="toggleNavState")
      v-icon(v-if="navState") swap_vert
      v-icon(v-else) swap_horiz
    // v-btn(fab dark small :color="(fullScreen) ? navColor : 'grey'" @click="toggleFullScreen")
      v-icon(v-if="fullScreen") fullscreen
      v-icon(v-else) fullscreen_exit

  v-speed-dial.navfab(v-model="navfab" direction="left" bottom=true right=true open-on-hover=false transition="slide-x-reverse-transition")
    v-btn(slot="activator" :color="navColor" dark fab hover v-model="navfab")
      v-icon(v-html="navIcon")
      v-icon close
    v-tooltip(top)
      v-btn(fab dark small :color="(navState) ? navColor : 'grey'" @click="toggleNavState" slot="activator")
        v-icon(v-if="navState") swap_vert
        v-icon(v-else) swap_horiz
      span Nav
    v-tooltip(top)
      v-btn(fab dark small :color="(fullScreen) ? navColor : 'grey'" @click="toggleFullScreen" slot="activator")
        v-icon(v-if="fullScreen") fullscreen
        v-icon(v-else) fullscreen_exit
      span Fullscreen
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
    bottom: 40px;
    right: 40px;
  }

  .navfab .btn--floating {
    position: relative;
  }
</style>