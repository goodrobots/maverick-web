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
          v-flex(v-for="(data, key) in $store.state.modules" v-if="data.enabled == true" :key="key" :color="data.color" xs12 sm6 md6 lg4)
            v-btn(:color="data.color" :to="'/' + key" block) {{ key | capitalize }}
                  v-icon(right) {{ data.icon }}
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