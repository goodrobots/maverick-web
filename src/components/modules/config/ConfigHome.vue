<template lang='pug'>
v-container(fluid)
  v-card
    v-app-bar(:color="topColor" dense)
      v-toolbar-title Maverick Web Settings
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=4 md=6)
          v-card(ripple hover shaped to="/config/interface")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Interface Settings
                v-card-subtitle Configure user interface look and feel.
                v-card-actions
                  v-btn(color="primary" small to="/config/interface") GoTo Settings
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-account-cog
        v-col(lg=4 md=6)
          v-card(ripple hover shaped to="/config/modules")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Web Modules
                v-card-subtitle Enable/Disable web modules.
                v-card-actions
                  v-btn(color="primary" small to="/config/interface") GoTo Modules
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-view-module
        v-col(lg=4 md=6)
          v-card(ripple hover shaped to="/config/video")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Video Streams
                v-card-subtitle Create and edit Video Streams.
                v-card-actions
                  v-btn(color="primary" small to="/config/video") GoTo Video Streams
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-video

  
  v-card.mt-4
    v-app-bar(:color="topColor" dense)
      v-toolbar-title Maverick API Configuration
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/config/discovery")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Discovery Agents
                v-card-subtitle Configure user interface look and feel.
                v-card-actions
                  v-btn(color="primary" small to="/config/discovery") GoTo Agents
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-cloud-search
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/config/connections")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline API Connections
                v-card-subtitle Enable/Disable web modules.
                v-card-actions
                  v-btn(color="primary" small to="/config/connections") GoTo Connections
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-router-wireless-settings
</template>              
<script>
export default {
  name: "ConfigHome"
}
</script>
