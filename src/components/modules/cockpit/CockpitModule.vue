<template lang='pug'>
v-content.cockpit-layout(:key="activeApi")
  cockpit-map(v-if="mapState")
  cockpit-renderer(v-if="hudState")
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
  components: {
    CockpitRenderer,
    CockpitContainer,
    CockpitHud,
    CockpitMap
  },
  data () {
    return {
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi },
    mapState () { return this.$store.state.cockpit.mapState },
    hudState () { return this.$store.state.cockpit.hudState }
  }
}
</script>

<style scoped>
.cockpit-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
