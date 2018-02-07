<template>
  <v-app :class="{'theme--dark': themeType}">
    <v-navigation-drawer
      app
      clipped
      fixed
      v-model="drawer"
    >
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
              <!-- <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt=""> -->
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
    </v-navigation-drawer>
    <v-toolbar
      :color="toolbarColor"
      app
      dense
      fixed
      clipped-left
      lights-out
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-icon class="ml-3">fa-youtube</v-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>Planner</v-btn>
        <v-btn flat>Analysis</v-btn>
        <v-menu offset-y>
          <v-btn flat slot="activator">Config</v-btn>
          <v-list>
            <v-list-tile v-for="configItem in configItems" :key="configItem" @click="">
              <v-list-tile-title v-text="configItem"></v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
        <v-menu offset-y>
          <v-btn flat slot="activator">Vehicle</v-btn>
          <v-list>
            <v-list-tile v-for="vehicleItem in vehicleItems" :key="vehicleItem" @click="">
              <v-list-tile-title v-text="vehicleItem"></v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
        <v-spacer></v-spacer>
      </v-toolbar-items>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-content>
      <v-container fluid fill-height>
          <!-- <router-view/> -->
          <state-card-subscription></state-card-subscription>
      </v-container>
    </v-content>
    
    <v-navigation-drawer
      temporary
      clipped
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-container fluid>
        <v-switch :label="`Theme: ${themeTypeStr}`" v-model="themeType" @change='toggleDarkLight()'></v-switch>
        <div>Theme Main Color</div>
        <v-flex xs12 sm6 md6>
            <v-radio-group v-model="themeColor" @change='changeColor' column>
              <v-radio v-for="color in colors" :label="color.name" :color="color.value" :value="color.value"></v-radio>
            </v-radio-group>
          </v-flex>
      </v-container>
    </v-navigation-drawer>
    <v-footer class="pa-3" :fixed="fixed" app :color="toolbarColor">
      <v-spacer></v-spacer>
      <div>&copy; GoodRobots {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
// import LinkList from './components/LinkList'
import StateCardSubscription from './components/StateCardSubscription'
export default {
  components: {
    StateCardSubscription
  },
  data () {
    return {
      drawer: false,
      fixed: true,
      configItems: [
        'Flight Controller', 'Onboard Computer', 'Web App'
      ],
      vehicleItems: [
        'Plane: Nano Talon',
        'Copter: Dronie'
      ],
      vehicleMenuItems: [
        { text: 'Parameters', picture: '' },
        { text: 'Sensor Config', picture: '' }
      ],
      menuItems: [
        { icon: 'bubble_chart', text: 'I do nothing!' }
      ],
      right: true,
      rightDrawer: false,
      themeType: true,
      themeTypeStr: 'Dark',
      themeColor: 'orange',
      toolbarColor: 'orange darken-4',
      title: 'Maverick',
      colors: [
        { name: 'Red', value: 'red' },
        { name: 'Pink', value: 'pink' },
        { name: 'Purple', value: 'purple' },
        { name: 'Deep Purple', value: 'deep-purple' },
        { name: 'Indigo', value: 'indigo' },
        { name: 'Blue', value: 'blue' },
        { name: 'Light Blue', value: 'light-blue' },
        { name: 'Cyan', value: 'cyan' },
        { name: 'Teal', value: 'teal' },
        { name: 'Green', value: 'green' },
        { name: 'Light Green', value: 'light-green' },
        { name: 'Lime', value: 'lime' },
        { name: 'Yellow', value: 'yellow' },
        { name: 'Amber', value: 'amber' },
        { name: 'Orange', value: 'orange' },
        { name: 'Deep Orange', value: 'deep-orange' },
        { name: 'Brown', value: 'brown' },
        { name: 'Blue Grey', value: 'blue-grey' },
        { name: 'Grey', value: 'grey' }
      ]
    }
  },
  methods: {
    toggleDarkLight: function () {
      if (this.themeType) {
        this.themeTypeStr = 'Dark'
        this.toolbarColor = this.themeColor + ' darken-4'
      } else {
        this.themeTypeStr = 'Light'
        this.toolbarColor = this.themeColor + ' lighten-5'
      }
      console.log('toggleDarkLight: ' + this.toolbarColor)
    },
    changeColor: function () {
      console.log('changeColor: ' + this.themeColor)
      this.toggleDarkLight()
    }
  },
  name: 'App'
}
</script>

<style>

</style>