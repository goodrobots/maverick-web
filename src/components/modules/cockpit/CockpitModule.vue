<template lang='pug'>
v-content
  v-container(fluid grid-list-xl)
    v-layout(row wrap)
      // v-flex(xs12 sm6 md4)
        state-card(:key="activeApi")
      // v-flex(xs12 sm6 md4)
        vfr-hud-card(:key="activeApi")
      // v-flex(xs12 sm6 md4)
        nav-sat-fix-card(:key="activeApi")
      // v-flex(xs12 sm6 md4)
        pose-stamped-card(:key="activeApi")
      v-flex(xs12 sm6 md4)
        imu-card(:key="activeApi")
  div.cockpit-layout
    cockpit-renderer
      cockpit-container(@tick="tickInfo")
        cockpit-hud(:key="activeApi")
</template>

<script>
import StateCard from './StateCard'
import NavSatFixCard from './NavSatFixCard'
import PoseStampedCard from './PoseStampedCard'
import ImuCard from './ImuCard'
import VfrHudCard from './VfrHudCard'

import CockpitRenderer from './CockpitRenderer.vue'
import CockpitContainer from './CockpitContainer.vue'
import CockpitHud from './CockpitHud.vue'

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
    StateCard,
    VfrHudCard,
    NavSatFixCard,
    PoseStampedCard,
    ImuCard,
    CockpitRenderer,
    CockpitContainer,
    CockpitHud
  },
  methods: {
    tickInfo (container, delta) {
      // console.log(`Tick delta: ${delta}`)
    }
  }
}
</script>

<style scoped>
.cockpit-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>