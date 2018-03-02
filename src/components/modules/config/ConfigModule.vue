<template lang='pug'>
div
  config-drawer
  config-toolbar
  v-content
    router-view(:key="activeApi")
</template>

<script>
import ConfigToolbar from './ConfigToolbar'
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
    ConfigToolbar,
    ConfigDrawer
  }
}
</script>
