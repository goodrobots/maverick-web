<template>
  <v-content>
    <v-container fluid grid-list-xl px-2 py-2>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <planner-toolbar></planner-toolbar>
        </v-flex>
      </v-layout>
        <planner-cesium></planner-cesium>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import PlannerToolbar from './PlannerToolbar'
import PlannerCesium from './PlannerCesium'
export default {
  name: 'PlannerModule',
  data () {
    return {
    }
  },
  components: {
    PlannerToolbar,
    PlannerCesium
  }
}
</script>

<style>
    
</style>