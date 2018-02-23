<template lang='pug'>
div
  config-drawer
  config-toolbar
  v-content
    router-view
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
  components: {
    ConfigToolbar,
    ConfigDrawer
  }
}
</script>
