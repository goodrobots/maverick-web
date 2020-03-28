<template lang='pug'>
v-container(fluid)
  v-card
    v-app-bar(:color="topColor" dense)
      v-toolbar-title Maverick Control
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/maverick/services")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Services
                v-card-subtitle Control Maverick services and enable at boot time.
                v-card-actions
                  v-btn(color="primary" small to="/maverick/services") GoTo Services
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-account-cog
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/maverick/commands")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Commands
                v-card-subtitle Control Maverick through interactive terminal.
                v-card-actions
                  v-btn(color="primary" small to="/maverick/commands") GoTo Commands
              v-avatar.ma-3(tile)
                v-icon(x-large color="primary") mdi-view-module

  
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
