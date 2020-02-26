<template lang='pug'>
v-content
  v-container(fluid grid-list-xl fill-height)
    v-layout(align-center justify-space-around column)
      v-flex(xs12)
        v-spacer
      v-flex(xs12)
        img.front-gr-logo(:src="publicPath + 'img/logos/maverick-logo-complete-white.svg'" height="250px")
      v-flex(xs12)
        v-layout(justify-center wrap)
          //- v-flex(xs12 sm6 md6 lg3)
          //-   v-btn(color='mavorange' to='/cockpit') Cockpit
          //-     v-icon(right) mdi-airplane-takeoff
          //- v-flex(xs12 sm6 md6 lg3)
          //-   v-btn(color='mavblue' to='/planner') Planner
          //-     v-icon(right) mdi-map-marker-circle
          //- v-flex(xs12 sm6 md6 lg3)
          //-   v-btn(color='mavpurple' to='/config') Config
          //-     v-icon(right) mdi-settings
          //- v-flex(xs12 sm6 md6 lg3)
          //-   v-btn(color='mavgreen' to='/analysis') Analysis
          //-     v-icon(right) mdi-equalizer
          v-flex(xs12 sm6 md6 lg3)
            v-btn(color='mavgrey' to='/maverick') Maverick
              v-icon(right) mdi-console
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