<template lang='pug'>
div
  v-app#fullscreen(:class="{'theme--dark': themeType}")
    top-nav
    v-fade-transition(mode="out-in")
      router-view
    bottom-nav
  action-button(v-if="(moduleName !== 'home')" :class="{'theme--dark': themeType}")
</template>

<script>
import BottomNav from './components/common/BottomNav'
import TopNav from './components/common/TopNav'
import ActionButton from './components/common/ActionButton'
export default {
  components: { BottomNav, TopNav, ActionButton },
  data () {
    return {
      themeType: true
    }
  },
  computed: {
    moduleName () {
      switch (true) {
        case /^\/cockpit/.test(this.$store.state.route.path): this.$store.commit('setModuleName', 'cockpit'); break
        case /^\/planner/.test(this.$store.state.route.path): this.$store.commit('setModuleName', 'planner'); break
        case /^\/config/.test(this.$store.state.route.path): this.$store.commit('setModuleName', 'config'); break
        case /^\/analysis/.test(this.$store.state.route.path): this.$store.commit('setModuleName', 'analysis'); break
        default: this.$store.commit('setModuleName', 'home')
      }
      switch (this.$store.state.moduleName) {
        case 'cockpit': this.$store.commit('setNavColor', 'mavblue'); break
        case 'planner': this.$store.commit('setNavColor', 'mavorange'); break
        case 'config': this.$store.commit('setNavColor', 'mavpurple'); break
        case 'analysis': this.$store.commit('setNavColor', 'mavgreen'); break
        default: this.$store.commit('setNavColor', null)
      }
      console.log('route: ' + this.$store.state.route.path)
      return this.$store.state.moduleName
    }
  },
  name: 'App'
}
</script>
