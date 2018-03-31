<template lang='pug'>
v-app#fullscreen(:class="{'theme--dark': themeType}")
  top-nav
  v-fade-transition(mode="out-in")
    router-view
  bottom-nav
  action-button
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
  name: 'App'
}
</script>
