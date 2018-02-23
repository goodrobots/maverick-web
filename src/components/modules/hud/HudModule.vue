<template>
  <v-content>
    <v-container fluid grid-list-xl px-2 py-2>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <hud-toolbar></hud-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs6 sm6 md4>
          <state-card></state-card>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <vfr-hud-card></vfr-hud-card>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <nav-sat-fix-card></nav-sat-fix-card>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <pose-stamped-card></pose-stamped-card>
        </v-flex>
        <v-flex xs6 sm6 md4>
          <imu-card></imu-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import HudToolbar from './HudToolbar'
import StateCard from './StateCard'
import NavSatFixCard from './NavSatFixCard'
import PoseStampedCard from './PoseStampedCard'
import ImuCard from './ImuCard'
import VfrHudCard from './VfrHudCard'

var Cesium = require('webpack-cesium')
console.log(Cesium.VERSION) // => 1.31

export default {
  name: 'HudModule',
  data () {
    return {
    }
  },
  components: {
    HudToolbar,
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