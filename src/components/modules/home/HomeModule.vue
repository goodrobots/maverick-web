<template lang='pug'>
v-content
  v-container.fill-height
    v-spacer
    v-container
      v-row.mb-4(align='center' justify='center')
        img.front-gr-logo(:src="topLogo" height="80px")
      v-row(align='center' justify='center')
        v-col(v-for="(data, key) in $store.state.core.modules" v-if="$store.state.data.modulesActive[key] == true" :key="key" :color="data.color" cols='12' xs='12' sm='6' md='4' lg='3' xl='2')
          v-btn(:color="data.color" :to="'/' + key" block dark)
            span {{ key | capitalize }}
            v-icon(right) {{ data.icon }}
      v-row(v-if="!ssl && !$store.state.core.sslState" align='center' justify='center')
        v-col(xs='12' sm='12' md='6' lg='6' xl='4')
          v-row(align='center' justify='center')
            v-alert(type='warning' border='left' outlined) Maverick-Web is not loaded over an encrypted SSL connection, and your Maverick CA certificate is not loaded into your browser.
          v-row(align='center' justify='center')
            v-btn(color='orange darken-2' @click="$refs.sslDialog.open()") Load Maverick CA certificate.
      v-row(v-else-if="!ssl && $store.state.core.sslState" align='center' justify='center')
        v-col(xs='12' sm='12' md='6' lg='6' xl='4')
          v-row(align='center' justify='center')
            v-alert(type='warning' border='left' outlined) Maverick-Web is not loaded over an encrypted SSL connection.
          v-row(align='center' justify='center')
            v-btn(color='orange darken-2' @click="gotoSsl()") Connect over SSL
      v-row(v-else-if="ssl")
        v-col(xs='12' sm='12' md='6' lg='6' xl='4')
          v-row(align='center' justify='center')
            v-alert(type='success' border='left' outlined) Maverick-Web is loaded over an encrypted SSL connection.

    v-spacer
    v-footer.transparent(absolute height="auto")
      v-row(align='center' justify='center')
        img.mb-4(:src="publicPath + 'img/logos/goodrobots-text-white.svg'" height='30px')
    SslDialog(:sslitem="sslitem" ref="ssldialog")
</template>

<script>
import SslDialog from '../../common/SslDialog'

export default {
  name: 'HomeModule',
  components: {
    SslDialog
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      sslitem: {}
    }
  },
  computed: {
    ssl () {
      return (window.location.protocol == 'https:' ? true : false)
    },
    topLogo () {
      if (this.isDark) {
        return this.publicPath + 'img/logos/maverick-logo-white.svg'
      } else {
        return this.publicPath + 'img/logos/maverick-logo-dark.svg'
      }
    },
  },
  mounted () {
    // this.$refs.ssldialog.open()
  },
  methods: {
    gotoSsl() {
      window.location.href = `https://${window.location.hostname}`
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