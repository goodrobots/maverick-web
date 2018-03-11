<template lang='pug'>
div
  config-drawer
  v-content
    router-view(:key="activeApi")
</template>

<script>
import ConfigDrawer from './ConfigDrawer'
export default {
  name: 'ConfigModule',
  data () {
    return {
      drawer: true
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  components: {
    ConfigDrawer
  }
}
</script>
