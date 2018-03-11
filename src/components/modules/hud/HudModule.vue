<template lang='pug'>
v-content
  v-container(fluid grid-list-xl)
    v-layout(row wrap)
      v-flex(xs12 sm6 md4)
        state-card(:key="activeApi")
      v-flex(xs12 sm6 md4)
        vfr-hud-card(:key="activeApi")
      v-flex(xs12 sm6 md4)
        nav-sat-fix-card(:key="activeApi")
      v-flex(xs12 sm6 md4)
        pose-stamped-card(:key="activeApi")
      v-flex(xs12 sm6 md4)
        imu-card(:key="activeApi")
</template>

<script>
import StateCard from './StateCard'
import NavSatFixCard from './NavSatFixCard'
import PoseStampedCard from './PoseStampedCard'
import ImuCard from './ImuCard'
import VfrHudCard from './VfrHudCard'

export default {
  name: 'HudModule',
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
    ImuCard
  }
}
</script>
