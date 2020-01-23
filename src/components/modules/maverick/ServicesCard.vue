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
    }
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    }
  }
}
</script>