<template>
  <v-toolbar
      dense
      clipped-left
      :color="navColor"
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="appTitle"></v-toolbar-title>
      <v-icon class="ml-3">fa-youtube</v-icon>
      <v-spacer></v-spacer>
    
      <v-toolbar-items>
<!--
        <v-menu offset-y>
          <v-btn flat slot="activator">Config</v-btn>
          <v-list>
            <v-list-tile v-for="configItem in configItems" :key="configItem" @click="">
              <v-list-tile-title v-text="configItem"></v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
-->
        <v-menu offset-y>
          <v-btn flat slot="activator">Vehicle</v-btn>
          <v-list>
            <v-list-tile v-for="(vehicle, key) in vehicles" :key="vehicle" @click='changeVehicle(key)'>
              <v-list-tile-title v-text="vehicle"></v-list-tile-title>
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
    vehicles () { return this.$store.state.vehicles }
  }
}
</script>