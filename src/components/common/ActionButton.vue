<template lang='pug'>
v-card.transparent.navfab

  v-speed-dial.navfab(v-model="navfab" direction="top" bottom=true right=true open-on-hover=false transition="slide-y-reverse-transition")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on" :color="navColor" dark fab hover v-model="navfab")
        v-icon(v-html="navIcon")
        v-icon close
    v-tooltip(v-if="(moduleName !== 'analysis')" left)
      template(v-slot:activator="{ on }")
        v-btn( fab dark :small="(moduleName !== 'analysis')" color="mavgreen" to="/analysis" v-on="on")
          v-icon equalizer
      span Analysis
    v-tooltip(v-if="(moduleName !== 'config')" left)
      template(v-slot:activator="{ on }")
        v-btn(fab dark :small="(moduleName !== 'config')" color="mavpurple" to="/config" v-on="on")
          v-icon settings
      span Configuration
    v-tooltip(v-if="(moduleName !== 'planner')" left)
      template(v-slot:activator="{ on }")
        v-btn(fab dark :small="(moduleName !== 'planner')" color="mavblue" to="/planner" v-on="on")
          v-icon explore
      span Planner
    v-tooltip(v-if="(moduleName !== 'cockpit')" left)
      template(v-slot:activator="{ on }")
        v-btn(fab dark :small="(moduleName !== 'cockpit')" color="mavorange" to="/cockpit" v-on="on")
          v-icon flight_takeoff
      span Cockpit
    v-tooltip(left)
      template(v-slot:activator="{ on }")
        v-btn(fab dark small :color="(navState) ? navColor : 'grey'" @click="toggleNavState" v-on="on")
          v-icon(v-if="navState") swap_vert
          v-icon(v-else) swap_horiz
      span Top Nav
    v-tooltip(left)
      template(v-slot:activator="{ on }")
        v-btn(fab dark small :color="(fullScreen) ? navColor : 'grey'" @click="toggleFullScreen" v-on="on")
          v-icon(v-if="fullScreen") fullscreen
          v-icon(v-else) fullscreen_exit
      span Fullscreen

  v-speed-dial.navfab(v-model="navfab" direction="left" bottom=true right=true open-on-hover=false transition="slide-x-reverse-transition")
    template(v-slot:activator="{ on }")
      v-btn(v-on="on" :color="navColor" dark fab hover v-model="navfab")
        v-icon(v-html="navIcon")
        v-icon close
    // Cockpit specific actions
    template(v-if="(moduleName === 'cockpit')")
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(fab dark small :color="(cockpitMapState) ? navColor : 'grey'" @click="toggleMap" v-on="on")
            v-icon my_location
        span Map
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(fab dark small :color="(cockpitHudState) ? navColor : 'grey'" @click="toggleHud" v-on="on")
            v-icon surround_sound
        span HUD
    // Planner specific actions
    template(v-if="(moduleName === 'planner')")
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(fab dark small :color="(plannerViewState) ? navColor : 'grey'" @click="toggleView" v-on="on")
            v-icon 3d_rotation
        span 2D/3D View
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
    // Global states
    navState () {
      return this.$store.state.navState
    },
    navColor () {
      return this.$store.state.navColor
    },
    fullScreen () {
      return this.$store.state.fullScreen
    },
    moduleName () {
      return this.$store.state.moduleName
    },
    navIcon () {
      switch (this.moduleName) {
        case 'cockpit':
          return 'flight_takeoff'
        case 'planner':
          return 'explore'
        case 'config':
          return 'settings'
        case 'analysis':
          return 'equalizer'
        default:
          return null
      }
    },
    // Config states
    cockpitMapState () {
      return this.$store.state.cockpit.mapState
    },
    cockpitHudState () {
      return this.$store.state.cockpit.hudState
    },
    // Planner states
    plannerViewState () {
      return this.$store.state.planner.viewState
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
    },
    toggleMap () {
      this.$store.commit('cockpit/setMapState', !this.cockpitMapState)
    },
    toggleHud () {
      this.$store.commit('cockpit/setHudState', !this.cockpitHudState)
    },
    toggleView () {
      this.$store.commit('planner/setViewState', !this.plannerViewState)
    }
  }
}
</script>

<style scoped>
.navfab .v-speed-dial {
  position: fixed;
  bottom: 25px;
  right: 25px;
}

.navfab .btn--floating {
  position: relative;
}
</style>
