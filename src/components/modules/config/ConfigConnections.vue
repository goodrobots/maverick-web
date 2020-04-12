<template lang='pug'>
div
  v-data-iterator(:items="items" item-key="key" hide-default-footer :single-expand="expand")

    template(v-slot:header)
      v-toolbar.mb-1(color="primary lighten-1" dense)
        v-toolbar-title API Connections
        v-spacer
        // v-text-field(v-model="search" clearable flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search")
        v-spacer
        v-btn(@click.stop="dialog = true" color="primary")
          v-icon(left) mdi-plus-box
          span Add API Connection
    
    template(v-slot:no-data)
      v-alert.ma-8(border="left" outlined type="info" color="primary")
        span No API Connections are defined.
          v-btn.ml-2(@click.stop="dialog = true" :color="navColor+' darken-2'" small)
            span Add API Connection

    template(v-slot:default="{ items, isExpanded, expand }")
      v-row
        v-col(v-for="item in items" :key="item.key" cols="12" sm="12" md="12" lg="12")
          v-card
            v-toolbar(dense)
              v-toolbar-title
                span {{ item.name }}
                v-chip.ma-2(v-if="isApiReady(item.key)" color='success' small)
                  v-icon(left) mdi-check-circle
                  span Connected
                v-chip.ma-2(v-else color='error' small)
                  v-icon(left) mdi-alert-circle
                  span Not Connected
              v-spacer
              v-switch.mt-4(:color="navColor" :input-value="isExpanded(item)" :label="isExpanded(item) ? 'Editing' : 'Edit'" @change="(v) => expand(item, v)")
          v-row(v-if="isExpanded(item)")
            v-container.mt-0.pt-0(fluid)
              v-card
                v-row
                  v-col.pt-0.pr-1(cols="12" sm="12" md="6" lg="6")
                    v-list(dense)
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.name" label="API Name/Description")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.httpEndpoint" label="GraphQL Endpoint")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.httpsEndpoint" label="Encrypted GraphQL Endpoint")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.wsEndpoint" label="Websockets Endpoint")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.wssEndpoint" label="Encrypted Websockets Endpoint")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.schemaEndpoint" label="Schema Endpoint")
                      v-list-item
                        v-list-item-content
                          v-text-field(v-model="item.schemasEndpoint" label="Encrypted Schema Endpoint")
                      v-list-item
                        v-btn(color='success' @click="save(item)") Save
                        v-btn.ml-2(color='blue' @click="connect(item)") Connect
                        v-spacer
                        v-btn(color='error' @click="remove(item)")
                          v-icon(left) mdi-delete
                          span Delete
                  v-col.pt-0.pl-1(cols="12" sm="12" md="6" lg="6")
                    v-list(dense)
                      v-list-item
                        v-list-item-content API Unique ID
                        v-list-item-content
                          span.success--text.text--lighten-1(v-if="apistate[item.key].uuid") {{ apistate[item.key].uuid }}
                          v-icon(v-else color='error') mdi-alert-circle-outline
                      v-list-item
                        v-list-item-content API Last Seen
                        v-list-item-content
                          span.success--text.text--lighten-1(v-if="lastseen(item.key) < 60") {{ lastseen(item.key).toFixed(2) }} seconds ago
                          span.error--text.text--lighten-1(v-else) {{ lastseen(item.key).toFixed(2) }} seconds ago
                      v-list-item
                        v-list-item-content API Connection State
                        v-list-item-content
                          v-icon(v-if="apistate[item.key].state" color='success') mdi-check-circle-outline
                          v-icon(v-else color='error') mdi-alert-circle-outline
                      v-list-item
                        v-list-item-content API Schema Ready
                        v-list-item-content
                          v-icon(v-if="apistate[item.key].schemaready" color='success') mdi-check-circle-outline
                          v-icon(v-else color='error') mdi-alert-circle-outline
                      v-list-item
                        v-list-item-content Authentication Set
                        v-list-item-content
                          v-icon(v-if="apistate[item.key].auth" color='success') mdi-check-circle-outline
                          v-icon(v-else color='error') mdi-alert-circle-outline
                      v-list-item
                        v-list-item-content Icon Set
                        v-list-item-content
                          v-icon(v-if="apistate[item.key].icon" color='success') {{ apistate[item.key].icon }}
                          v-icon(v-else color='error') mdi-alert-circle-outline
                    v-divider
                    v-list(dense)
                      v-list-item
                        v-list-item-content SSL Status
                        v-list-item-content
                          v-icon(v-if="apistate[item.key].sslstate === true" color='success') mdi-check-circle-outline
                          v-icon(v-else color='error') mdi-alert-circle-outline
                      v-list-item(v-if="apistate[item.key].sslstate !== true")
                        v-list-item-content
                          v-btn(color="primary" @click="setupSsl(item.key)") Setup SSL
  
  v-dialog(v-model="dialog" max-width="600px")
    v-card
      v-card-title.headline(class="primary" primary-title)
        v-icon(left) mdi-plus-box
        span Add API Connection
      v-card-text
        v-container
          v-row
            v-col(cols="12" sm="6" md="6")
              v-text-field(v-model="newitem.key" label="API Key (Short)" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.name" label="API Name/Description" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.hostname" label="Hostname (FQDN) / IP Address" required)
          v-row
            v-col(cols="12" sm="12" md="12")
              v-text-field(v-model="newitem.port" label="Port" required)
      v-card-actions
        v-btn.ma-2(color="success" @click="createConnection()") Create Connection
        v-btn.ma-2(color="error" @click="dialog = false") Cancel

  v-dialog(v-model="sslDialog" max-width="600px" overlay-opacity=0.85)
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

      v-divider
      v-card-actions
        v-spacer
        v-btn.ma-2(color="error" @click="sslDialog = false") Close

  v-dialog(v-if="deleteitem" v-model="deleteDialog" max-width="400")
    v-card
      v-card-title
        span.headline.error--text Delete Connection: <strong>{{ deleteitem.key }}</strong>?
      v-card-text
        h3 {{ deleteitem.name }}
        div Are you sure you want to delete this API connection?
      v-card-actions
        v-spacer
        v-btn(text @click="deleteDialog = false") Cancel
        v-btn(text color="error darken-1" @click="removeConnection()") Delete
</template>

<script>
export default {
  name: "ConfigConnections",
  components: {
  },
  data() {
    return {
      search: '',
      filter: {},
      dialog: false,
      deleteDialog: false,
      sslDialog: false,
      newitem: {},
      deleteitem: null,
      sslitem: null,
      expand: true
    }
  },
  computed: {
    items () {
      return Object.values(this.apis)
    }
  },
  mounted () {
  },
  methods: {
    connect(apiData) {
      this.logDebug('Connecting: ' + apiData.key)
      if (!(this.$apollo.provider.clients[apiData.key])) {
        this.createClient(apiData.key, this.apis[apiData.key])
      }
    },
    createConnection() {
      this.dialog = false // Close dialog
      this.logDebug('Creating new connection: ' + this.newitem.key)
      const protocol = 'http:'
      const wsprotocol = (protocol.includes("https")) ? 'wss:' : 'ws:'
      let data = {
        key: this.newitem.key,
        "httpEndpoint": `${protocol}//${this.newitem.hostname}:${this.newitem.port}/graphql`,
        "wsEndpoint": `${wsprotocol}//${this.newitem.hostname}:${this.newitem.port}/subscriptions`,
        "schemaEndpoint": `${protocol}//${this.newitem.hostname}:${this.newitem.port}/schema`,
        "websocketsOnly": false,
        "name": this.newitem.name,
        "colorLight": "rgba(166,11,11,0.3)",
        "colorDark": "rgba(166,11,11,0.9)",
        "authToken": null
      }
      this.$store.commit('data/addApi', {key: data.key, data: data})
    },
    lastseen (api) {
      let lastseen = (this.$store.state.core.apiSeen.hasOwnProperty(api)) ? this.$store.state.core.apiSeen[api] : 0
      return (performance.now() - lastseen)
    },
    reloadPage(){
      window.location.reload()
    },
    remove(item) {
      this.deleteitem = item
      this.deleteDialog = true
    },
    removeConnection() {
      this.logDebug('Deleting connection:' + this.deleteitem.key)
      this.logDebug(this.activeApi)
      if (this.deleteitem.key == this.activeApi) {
        this.logDebug('Unsetting active connection')
        this.$store.commit('data/setActiveApi', null)
      }
      delete this.$apollo.provider.clients[this.deleteitem.key]
      this.$store.commit('data/removeApi', this.deleteitem.key)
      this.deleteitem = null
    },
    save(apiData) {
      this.$store.commit('data/setApiData', {api: apiData.key, data: apiData})
      // If any of the endpoints have changed, destroy and recreate the client
      // this.deleteQueries(apiData.key)
      // delete this.$apollo.provider.clients[apiData.key]
      // this.createClient(apiData.key+'new', apiData)
    },
    setupSsl(api) {
      this.logDebug(`Opening setupSsl for Api: ${this.apis[api].name}`)
      this.sslitem = this.apis[api]
      this.sslDialog = true
    }
  }
}
</script>
