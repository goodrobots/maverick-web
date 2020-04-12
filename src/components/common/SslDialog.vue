<template lang='pug'>
v-dialog(v-model="sslDialog" max-width=600 overlay-opacity=0.85)
    v-card
      v-card-title.headline.primary(primary-title)
        span SSL Setup
        v-spacer(v-if="sslitem")
        span.subtitle-1(v-if="sslitem")  {{ sslitem.name }}
      v-card-text(v-if="sslitem")
        v-container

          // Download CA cert step
          v-row
            v-col(cols="12" sm="12" md="12")
              div 1. Please click on the button below to download the SSL Certificate
              v-btn(color="primary" small :href="`http://${sslitem.hostname}/security/mavCA.crt`") Download SSL CA Certificate

          // Firefox ssl guide
          v-row(v-if="$browserDetect.isFirefox")
            v-col(cols="12" sm="12" md="12")
              div 2. In Firefox, a dialog should popup asking which permissions to give the certificate:
              img(src="img/ssl/firefox-sslca.png")
              div Click to enable 'Trust this CA to identify web sites'

          // MacOS Chrome/Safari ssl guide
          v-row(v-else-if="($browserDetect.isChrome || $browserDetect.isSafari) && (/OS X/.test($browserDetect.meta.ua) || /OSX/.test($browserDetect.meta.ua))")
            v-col(cols="12" sm="12" md="12")
              div 2. In MacOS Chrome or Safari, click on the downloaded file in the footer of the browser.
              img(src="img/ssl/macffsafari-1.png")
              div This will import the certificate into MacOS system Keychain Access app.
              img(src="img/ssl/macffsafari-2.png")
              div Choose the default 'login' option and click Add
            v-col(cols="12" sm="12" md="12")
              div 3. Double click on the untrusted certificate (with red X)
              img(src="img/ssl/macffsafari-3.png")
            v-col(cols="12" sm="12" md="12")
              div 4. Open the 'Trust' section and change 'When using this certificate' to 'Always Trust'
              img(src="img/ssl/macffsafari-4.png")
              div Close the window and it will ask you to authenticate, to verify the system certificate update.

          // Undetected browser ssl guide
          v-row(v-else)
            v-col(cols="12" sm="12" md="12")
              div 2. Unknown browser - please search on the internet for installation instructions for your OS/Browser:
              div {{ $browserDetect.meta.ua }}

          // Add reload step
          v-row
            v-col(cols="12" sm="12" md="12")
              div 3. Reload the website to activate the new certificate.
              v-btn(color="primary" small @click="reloadPage()") Reload
      v-card-actions
        v-spacer
        v-btn.ma-2(color="error" @click="close()") Close
</template>

<script>
export default {
  name: 'SslDialog',
  props: {
    sslitem: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
        sslDialog: false,
    }
  },
  methods: {
    open () {
      this.sslDialog = true
    },
    close () {
      this.sslDialog = false
    }
  }
}
</script>
