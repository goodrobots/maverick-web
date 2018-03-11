<template lang='pug'>
v-app(:class="{'theme--dark': themeType}")
  top-nav
  v-fade-transition(mode="out-in")
    router-view
  bottom-nav
</template>

<script>
import BottomNav from './components/common/BottomNav'
import TopNav from './components/common/TopNav'
export default {
  components: { BottomNav, TopNav },
  data () {
    return {
      themeType: true
    }
  },
  name: 'App'
}
</script>
