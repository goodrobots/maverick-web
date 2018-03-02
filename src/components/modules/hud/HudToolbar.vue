<template>
  <v-toolbar
      dense
      clipped-left
      :color="navColor"
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="appTitle"></v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn flat slot="activator">Vehicle</v-btn>
          <v-list>
            <v-list-tile v-for="(apitext, api) in apis" :key="api" @click='changeApi(api)'>
              <v-list-tile-title v-text="apitext"></v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
        <v-spacer></v-spacer>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  computed: {
    appTitle () { return this.$store.state.appTitle },
    navColor () { return this.$store.state.navColor },
    apis () { return this.$store.state.apis }
  },
  methods: {
    changeApi (api) {
      this.$store.commit('setApi', api)
    }
  }
}
</script>