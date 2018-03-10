<template>
<v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm6 md6>
            <v-card class='transparent elevation-0'>
              <v-card-media>
                <img src="static/img/logos/maverick-text-logo-dark.svg" height='85%' width='75%'>
              </v-card-media>
            </v-card>
            <v-container>
              <v-layout row wrap justify-center>
                <v-flex xs6 sm6 md3 text-xs-center>
                  <v-btn color="mavblue" to="/hud">HUD
                    <v-icon right>flight_takeoff</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs6 sm6 md3 text-xs-center>
                  <v-btn color="mavorange" to="/planner">Planner
                    <v-icon right>explore</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs6 sm6 md3 text-xs-center>
                  <v-btn color="mavpurple" to="/config">Config
                    <v-icon right>settings</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs6 sm6 md3 text-xs-center>
                  <v-btn color="mavgreen" to="/analysis">Analysis
                    <v-icon right>equalizer</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>

            <v-footer absolute height="auto" class="transparent">
              <v-layout row wrap justify-center class='pb-5'>
                <img src="static/img/logos/goodrobots-text-logo-dark.svg" height='25%'>
              </v-layout>
            </v-footer>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>

export default {
  name: 'HomeModule',
  data () {
    return {
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },
  components: {
  }
}
</script>
