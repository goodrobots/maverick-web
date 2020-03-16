<template>
  <v-card>
    <v-tabs
      v-model="active_tab"
      fixed-tabs
      color="mavgrey"
      background-color="transparent"
    >
      <v-tab
        v-for="tab of tabs"
        :key="tab.index"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="active_tab">
      <v-tab-item
        v-for="tab of tabs"
        :key="tab.index"
      >
        <keep-alive>
          <component :is="dynamicComponent" />
        </keep-alive>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ServicesCard from './ServicesCard.vue'
/*
import ConfigurationCard from './ConfigurationCard.vue'
import NetworkingCard from './NetworkingCard.vue'
import CommandsCard from './CommandsCard.vue'
*/

export default {
  name: "MaverickIndex",
  components: {
    ServicesCard
    /*
    ConfigurationCard,
    NetworkingCard,
    CommandsCard
    */
  },
  data: () => ({
    active_tab: 0,
    tabs: [
      { index: 0, name: "services", componentName: "ServicesCard" }
      /*
      { index: 1, name: "configuration", componentName: "ConfigurationCard" },
      { index: 2, name: "networking", componentName: "NetworkingCard" },
      { index: 3, name: "commands", componentName: "CommandsCard" }
      */
    ]
  }),

  computed: {
    dynamicComponent() {
      return this.tabs[this.active_tab].componentName
    }
  }
};
</script>
