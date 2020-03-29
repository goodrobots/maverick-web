<template lang='pug'>
v-container(fluid)
  v-card
    v-app-bar(:color="topColor" dense)
      v-toolbar-title System Control
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/system/services")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Services
                v-card-subtitle Control system services and enable at boot time.
                v-card-actions
                  v-btn(color="primary" small to="/system/services") GoTo Services
              v-avatar.ma-3(tile)
                v-icon(x-large) mdi-webhook
              v-spacer
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/system/console")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Console
                v-card-subtitle Control the system through interactive console.
                v-card-actions
                  v-btn(color="primary" small to="/system/console") GoTo console
              v-avatar.ma-3(tile)
                v-icon(x-large) mdi-keyboard
              v-spacer

  v-card.mt-4
    v-app-bar(:color="topColor" dense)
      v-toolbar-title System Configuration
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=6 md=6)
          v-card(ripple hover shaped)
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Configuration
                v-card-subtitle System configuration and settings.
                v-card-actions
                  v-btn(color="primary" small) GoTo Configuration
              v-avatar.ma-3(tile)
                v-icon(x-large) mdi-cog-outline
              v-spacer
        v-col(lg=6 md=6)
          v-card(ripple hover shaped)
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Networking
                v-card-subtitle Configure and control networking.
                v-card-actions
                  v-btn(color="primary" small) GoTo Networking
              v-avatar.ma-3(tile)
                v-icon(x-large) mdi-access-point-network
              v-spacer

  v-card.mt-4
    v-app-bar(:color="topColor" dense)
      v-toolbar-title Legacy Services
      v-spacer
    v-container(fluid)
      v-row()
        v-col(lg=6 md=6)
          v-card(ripple hover shaped to="/system/legacy")
            div.d-flex.flex-no-wrap.justify-space-between
              div
                v-card-title.headline Legacy Services
                v-card-subtitle Web services that have not been migrated to the new maverick-web interface.
                v-card-actions
                  v-btn(color="primary" small to="/system/legacy") GoTo Legacy
              v-avatar.ma-3(tile)
                v-icon(x-large) mdi-link
              v-spacer
</template>              
<script>
export default {
  name: "SystemHome"
}
</script>
