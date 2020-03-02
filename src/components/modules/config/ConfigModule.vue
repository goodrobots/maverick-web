<template lang='pug'>
div
  config-drawer
  v-content
    v-container(fluid)
      router-view(:key="activeApi")
</template>

<script>
import ConfigDrawer from './ConfigDrawer'

export default {
  name: 'ConfigModule',
  components: {
    ConfigDrawer
  },
  data () {
    return {
      drawer: true
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>
