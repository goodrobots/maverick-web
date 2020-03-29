<template lang='pug'>
div
  system-drawer
  v-content
    v-container(fluid)
      router-view(:key="activeApi")
</template>

<script>
import SystemDrawer from './SystemDrawer'

export default {
  name: "SystemModule",
  components: {
    SystemDrawer
  },
  data () {
    return {
      drawer: true
    }
  }
}
</script>