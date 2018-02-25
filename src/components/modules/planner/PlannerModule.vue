<template lang='pug'>
div#plannerContent
  planner-toolbar
  planner-cesium
</template>

<script>
import PlannerToolbar from './PlannerToolbar'
import PlannerCesium from './PlannerCesium'
export default {
  name: 'PlannerModule',
  data () {
    return {
    }
  },
  components: {
    PlannerToolbar,
    PlannerCesium
  }
}
</script>

<style scoped>
#plannerContent {
  position:fixed !important;
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
}
</style>