<template>
  <v-app :class="{'theme--dark': themeType}">
    <router-view/> 
    <v-bottom-nav
      app
      fixed
      :color="navColor"
      :value="navState"
    >
      <v-btn dark to="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn dark to="/hud">
        <span>HUD</span>
        <v-icon>flight_takeoff</v-icon>
      </v-btn>
      <v-btn dark to="/planner">
        <span>Planner</span>
        <v-icon>explore</v-icon>
      </v-btn>
      <v-btn dark to="/config">
        <span>Config</span>
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn dark to="/analysis">
        <span>Analysis</span>
        <v-icon>equalizer</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      themeType: true
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
        case /^\/hud/.test(this.routePath): this.$store.commit('setNavState', true); break
        case /^\/planner/.test(this.routePath): this.$store.commit('setNavState', true); break
        case /^\/config/.test(this.routePath): this.$store.commit('setNavState', true); break
        case /^\/analysis/.test(this.routePath): this.$store.commit('setNavState', true); break
        default: this.$store.commit('setNavState', false)
      }
      return this.$store.state.navState
    }
    // themeTypeStr () { return this.themeType ? 'Dark' : 'Light' }
  },
  name: 'App'
}
</script>

<style>
</style>