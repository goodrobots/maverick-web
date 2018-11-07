<template lang='pug'>
v-bottom-nav(app fixed :color="navColor" :value="navState")
  v-btn.mt-1(to="/") Home
    v-icon home
  v-btn.mt-1(to="/cockpit") Cockpit
    v-icon flight_takeoff
  v-btn.mt-1(to="/planner") Planner
    v-icon explore
  v-btn.mt-1(to="/config") Config
    v-icon settings
  v-btn.mt-1(to="/analysis") Analysis
    v-icon equalizer
</template>

<script>
export default {
  name: 'BottomNav',
  computed: {
    navColor () {
      return this.$store.state.navColor
    },
    navState () {
      return this.$store.state.moduleName === 'home'
        ? false
        : this.$store.state.navState
    } // Return false if home screen, otherwise from vuex state
  }
}
</script>
