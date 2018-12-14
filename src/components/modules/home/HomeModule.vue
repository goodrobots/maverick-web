<template lang='pug'>
v-content
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12 sm6 md6)
        v-card.transparent.elevation-0
          <v-responsive></v-responsive>
            img(src='@/assets/img/logos/maverick-text-logo-dark.svg' height='85%' width='75%')
        v-container
          v-layout(row wrap justify-center)
            v-flex(xs6 sm6 md6 text-xs-center)
              v-btn(color='mavblue' to='/cockpit') Cockpit
                v-icon(right) flight_takeoff
            v-flex(xs6 sm6 md6 text-xs-center)
              v-btn(color='mavorange' to='/planner') Planner
                v-icon(right) explore
            v-flex(xs6 sm6 md6 text-xs-center)
              v-btn(color='mavpurple' to='/config') Config
                v-icon(right) settings
            v-flex(xs6 sm6 md6 text-xs-center)
              v-btn(color='mavgreen' to='/analysis') Analysis
                v-icon(right) equalizer
        v-footer.transparent(absolute height="auto")
          v-layout.pb-5(row wrap justify-center)
            img(src="@/assets/img/logos/goodrobots-text-logo-dark.svg" height='25%')
</template>

<script>
export default {
  name: 'HomeModule'
}
</script>
