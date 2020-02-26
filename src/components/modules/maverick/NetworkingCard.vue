<template>
  <v-card>
    <v-toolbar dense>
      <v-toolbar-title>Networking</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div>
        <span>TODO: replace with networking modules</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'NetworkingCard',
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