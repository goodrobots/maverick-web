<template lang='pug'>
v-container(fluid)
  v-card
    v-toolbar(color="primary lighten-1" dense)
      v-toolbar-title Display Settings
    v-container.mt-2
      div
        span Colored Interface Background
        v-switch.mt-2(v-model="uiSettings.colorBg")
          template(v-slot:label)
            span.ml-4(v-if="uiSettings.colorBg") Colored
            span.ml-4(v-else) Not Colored
      div
        span Dark Interface
        v-switch.mt-2(v-model="uiSettings.dark")
          template(v-slot:label)
            span.ml-4(v-if="uiSettings.dark") Dark
            span.ml-4(v-else) Light
      div
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            span(v-on="on") Auto Dark Interface
              v-icon.ml-2(small) mdi-help-circle-outline
          span If enabled and supported by the OS/Browser, this will automatically set the interface to Light or Dark when the OS changes.
        v-switch.mt-2(v-model="uiSettings.autoDark")
          template(v-slot:label)
            span.ml-4(v-if="uiSettings.autoDark") Enabled
            span.ml-4(v-else) Disabled

  v-card.mt-4
    v-toolbar(color="primary lighten-1" dense)
      v-toolbar-title Notification Settings
    v-container.mt-2
      div
        span Service Notifications
        v-switch.mt-2(v-model="uiSettings.notifyServices")
          template(v-slot:label)
            span.ml-4(v-if="uiSettings.notifyServices") Enabled
            span.ml-4(v-else) Disabled
      div
        span Discovery Notifications
        v-switch.mt-2(v-model="uiSettings.notifyDiscovery")
          template(v-slot:label)
            span.ml-4(v-if="uiSettings.notifyDiscovery") Enabled
            span.ml-4(v-else) Disabled
</template>
<script>
export default {
  name: "ConfigInterface"
}
</script>
