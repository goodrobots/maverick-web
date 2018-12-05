<template lang='pug'>
v-container
  planner2d(v-if="!plannerViewState")
  planner3d(v-if="plannerViewState")
</template>

<script>
import Planner2d from './Planner2d'
import Planner3d from './Planner3d'

export default {
  name: 'PlannerModule',
  components: {
    Planner2d,
    Planner3d
  },
  data () {
    return {}
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    },
    plannerViewState () {
      return this.$store.state.planner.viewState
    }
  }
}
</script>
