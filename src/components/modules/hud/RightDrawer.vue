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
      </v-container>
    </v-navigation-drawer>