<template lang='pug'>
v-content(:key="activeApi")
  cockpit-map
  cockpit-renderer
    cockpit-container
      cockpit-hud
</template>

<script>
import CockpitRenderer from './CockpitRenderer.vue'
import CockpitContainer from './CockpitContainer.vue'
import CockpitHud from './CockpitHud.vue'
import CockpitMap from './CockpitMap.vue'

export default {
  name: 'CockpitModule',
  data () {
    return {
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  components: {
    CockpitRenderer,
    CockpitContainer,
    CockpitHud,
    CockpitMap
  }
}
</script>
