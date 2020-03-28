<template lang='pug'>
div
  maverick-drawer
  v-content
    v-container(fluid)
      router-view(:key="activeApi")
</template>

<script>
import MaverickDrawer from './MaverickDrawer'

export default {
  name: "MaverickModule",
  components: {
    MaverickDrawer
  },
  data () {
    return {
      drawer: true
    }
  }
}
</script>