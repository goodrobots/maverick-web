<template lang='pug'>
v-content
  v-container(fluid grid-list-xl fill-height)
    v-layout(align-center justify-space-around column)
      v-spacer
      v-flex(xs12)
        img.front-gr-logo(:src="publicPath + 'img/logos/maverick-logo-complete-white.svg'" height="250px")
      v-flex(xs12)
        v-layout.mx-auto(justify-center wrap)
          v-flex(v-for="(data, key) in $store.state.data.modules" v-if="data.enabled == true" :key="key" :color="data.color" xs12 sm6 md6 lg4)
            v-btn(:color="data.color" :to="'/' + key" block)
              v-icon(left) {{ data.icon }}
              span {{ key | capitalize }}
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

<style scoped>
.front-gr-logo {
  max-height: 30vh;
  max-width: 90vh;
}
</style>