<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span>TODO: replace with configuration modules</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ConfigurationCard',
  data () {
    return {
    }
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    }
  }
}
</script>