<template lang='pug'>
v-container(fluid)
  v-layout(align-center align-content-center justify-center column fill-height)
    v-flex(xs12)
      v-spacer
    v-flex(xs12)
      div.text-xs-center
        img.front-gr-logo(:src="publicPath + 'img/logos/maverick-logo-complete-white.svg'" height="500px")
      v-card.transparent.elevation-0
        v-container
          v-layout(row wrap justify-center)
            v-flex(xs12 sm6 md6 lg3 text-xs-center)
              v-btn(color='mavblue' to='/cockpit') Cockpit
                v-icon(right) flight_takeoff
            v-flex(xs12 sm6 md6 lg3 text-xs-center)
              v-btn(color='mavorange' to='/planner') Planner
                v-icon(right) explore
            v-flex(xs12 sm6 md6 lg3 text-xs-center)
              v-btn(color='mavpurple' to='/config') Config
                v-icon(right) settings
            v-flex(xs12 sm6 md6 lg3 text-xs-center)
              v-btn(color='mavgreen' to='/analysis') Analysis
                v-icon(right) equalizer
    v-flex(xs12)
      v-spacer
  v-footer.transparent(absolute height="auto")
    v-layout.pb-5(row wrap justify-center)
      img(:src="publicPath + 'img/logos/goodrobots-text-white.svg'" height='30px')
</template>

<script>
export default {
  name: 'HomeModule',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style>
.front-gr-logo {
  max-height: 30vh;
  max-width: 90vh;
}
</style>