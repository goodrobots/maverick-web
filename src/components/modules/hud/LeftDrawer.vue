<template>
  <v-navigation-drawer
        app
        clipped
        fixed
        v-model="drawer"
      >
    <!--
    <v-list dense>
      <v-list-tile v-for="item in menuItems" :key="item.text" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">VEHICLE CONFIG</v-subheader>
      <v-list>
        <v-list-tile v-for="item in vehicleMenuItems" :key="item.text" avatar @click="">
          <v-list-tile-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.text"></v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-list-tile class="mt-3" @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">add_circle_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon color="grey darken-1">settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
      </v-list-tile>
    </v-list>
    -->
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'LeftDrawer',
  data () {
    return {
      drawer: false
    }
  }
}
</script>
