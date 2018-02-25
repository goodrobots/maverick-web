<template lang='pug'>
v-toolbar(fixed dense clipped-left :color="navColor" app)
  v-toolbar-side-icon(@click.stop="drawer = !drawer")
  v-toolbar-title(v-text="appTitle")
  v-icon.ml-3 fa-youtube
  v-spacer
  v-toolbar-items
    v-menu(offset-y)
      v-btn(flat slot="activator") Vehicle
      v-list
        v-list-tile(v-for="(vehicle, key) in vehicles" :key="vehicle" @click='changeVehicle(key)')
          v-list-tile-title(v-text="vehicle")
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