<template>
  <v-app :class="{'theme--dark': themeType}">
    <router-view/> 
    <v-bottom-nav
      app
      shift
      fixed
      :value="true"
      :color="navColor"
    >
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
    navColor () {
      const routePath = this.$store.state.route.path
      switch (true) {
        case /^\/hud/.test(routePath): this.$store.commit('setNavColor', 'mavblue'); break
        case /^\/planner/.test(routePath): this.$store.commit('setNavColor', 'mavorange'); break
        case /^\/config/.test(routePath): this.$store.commit('setNavColor', 'mavpurple'); break
        case /^\/analysis/.test(routePath): this.$store.commit('setNavColor', 'mavgreen'); break
        default: this.$store.commit('setNavColor', null)
      }
      return this.$store.state.navColor
    },
    themeTypeStr () { return this.themeType ? 'Dark' : 'Light' }
  },
  name: 'App'
}
</script>

<style>
</style>