<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Commands</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span>TODO: replace with command modules</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CommandsCard',
  data () {
    return {
      commands: [
        {name: "configure", description: "Apply current configuration", status: false},
        {name: "reboot", description: "Restart the companion computer", status: false},
        {name: "shutdown", description: "shutdown the companion computer", status: false}
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