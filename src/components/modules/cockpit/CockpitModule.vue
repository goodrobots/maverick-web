<template lang='pug'>
v-content(:key="activeApi")
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

  data () {
    return {
    }
  },

  components: {
    CockpitRenderer,
    CockpitContainer,
    CockpitHud,
    CockpitMap
  },

  computed: {
    activeApi () { return this.$store.state.activeApi },
    mapState () { return this.$store.state.cockpit.mapState },
    hudState () { return this.$store.state.cockpit.hudState }
  }
}
</script>
