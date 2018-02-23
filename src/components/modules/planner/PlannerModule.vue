<template>
  <v-content>
    <v-container fluid grid-list-xl px-2 py-2>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <planner-toolbar></planner-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>

      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import PlannerToolbar from './PlannerToolbar'
export default {
  name: 'PlannerModule',
  data () {
    return {
    }
  },
  components: {
    PlannerToolbar
  }
}
</script>

<style>
    
</style>