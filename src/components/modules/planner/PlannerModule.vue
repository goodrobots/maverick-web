<template lang='pug'>
div.plannerContent
  planner-cesium(:key="activeApi")
</template>

<script>
import PlannerCesium from './PlannerCesium'
export default {
  name: 'PlannerModule',
  data () {
    return {
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  components: {
    PlannerCesium
  }
}
</script>

<style scoped>
.plannerContent {
  position:fixed !important;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
}
</style>