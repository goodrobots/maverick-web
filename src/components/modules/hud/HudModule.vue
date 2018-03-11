<template>
  <v-content>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <state-card :key="activeApi"></state-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <vfr-hud-card :key="activeApi"></vfr-hud-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <nav-sat-fix-card :key="activeApi"></nav-sat-fix-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <pose-stamped-card :key="activeApi"></pose-stamped-card>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <imu-card :key="activeApi"></imu-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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

<style>
    
</style>