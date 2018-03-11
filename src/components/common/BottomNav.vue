<template lang='pug'>
v-bottom-nav(app fixed :color="navColor" :value="navState")
  v-btn.ma-1(to="/") Home
    v-icon home
  v-btn.ma-1(to="/hud") HUD
    v-icon flight_takeoff
  v-btn.ma-1(to="/planner") Planner
    v-icon explore
  v-btn.ma-1(to="/config") Config
    v-icon settings
  v-btn.ma-1(to="/analysis") Analysis
    v-icon equalizer
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    routePath () { return this.$store.state.route.path },
    navColor () {
      switch (true) {
        case /^\/hud/.test(this.routePath): this.$store.commit('setNavColor', 'mavblue'); break
        case /^\/planner/.test(this.routePath): this.$store.commit('setNavColor', 'mavorange'); break
        case /^\/config/.test(this.routePath): this.$store.commit('setNavColor', 'mavpurple'); break
        case /^\/analysis/.test(this.routePath): this.$store.commit('setNavColor', 'mavgreen'); break
        default: this.$store.commit('setNavColor', null)
      }
      return this.$store.state.navColor
    },
    navState () {
      switch (true) {
        case /^\/hud/.test(this.routePath): this.$store.commit('setNavState', true); this.$store.commit('setNavIcon', false); break
        case /^\/planner/.test(this.routePath): this.$store.commit('setNavState', true); this.$store.commit('setNavIcon', false); break
        case /^\/config/.test(this.routePath): this.$store.commit('setNavState', true); this.$store.commit('setNavIcon', true); break
        case /^\/analysis/.test(this.routePath): this.$store.commit('setNavState', true); this.$store.commit('setNavIcon', false); break
        default: this.$store.commit('setNavState', false); this.$store.commit('setNavIcon', false)
      }
      return this.$store.state.navState
    }
  },
  name: 'BottomNav'
}
</script>
