<template lang='pug'>
v-content
  v-container(fill-height)
    v-spacer
    v-container
      v-row.mb-4(align='center' justify='center')
        img.front-gr-logo(:src="topLogo" height="80px")
      v-row(align='center' justify='center')
        v-col(v-for="(data, key) in $store.state.core.modules" v-if="$store.state.data.modulesActive[key] == true" :key="key" :color="data.color" cols='12' xs='12' sm='6' md='4' lg='3' xl='2')
          v-btn(:color="data.color" :to="'/' + key" block dark)
            span {{ key | capitalize }}
            v-icon(right) {{ data.icon }}
    v-spacer
    v-footer.transparent(absolute height="auto")
      v-row(align='center' justify='center')
        img.mb-4(:src="publicPath + 'img/logos/goodrobots-text-white.svg'" height='30px')
</template>

<script>
export default {
  name: 'HomeModule',
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {
    topLogo () {
      if (this.isDark) {
        return this.publicPath + 'img/logos/maverick-logo-white.svg'
      } else {
        return this.publicPath + 'img/logos/maverick-logo-dark.svg'
      }
    },
  }
}
</script>

<style scoped>
.front-gr-logo {
  max-height: 30vh;
  max-width: 90vh;
}
</style>