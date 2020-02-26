<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Services</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span>TODO: replace with services modules</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ServicesCard',
  data () {
    return {
    enviroments: [
      {name: "flight", display: "flight", description: "Environment configuration for during operation of the vehicle"},
      {name: "dev", display: "development", description: "Environment configuration for static development activities"}

    ],
    services: [
      { class: "SITL", group: "SITL-1", name: "SITL", description: "Software in the loop", status: "running", enabled: false, synced: "unknown"},
      { class: "SITL", group: "SITL-2", name: "SITL", description: "Software in the loop", status: "unkonwn", enabled: false, synced: "unknown"},
      { class: "SITL", group: "SITL-3", name: "SITL", description: "Software in the loop", status: "unkonwn", enabled: false, synced: "unknown"},
      { class: "SITL", group: "SITL-4", name: "SITL", description: "Software in the loop", status: "unkonwn", enabled: false, synced: "unknown"},
    ]
    }
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    }
  }
}
</script>