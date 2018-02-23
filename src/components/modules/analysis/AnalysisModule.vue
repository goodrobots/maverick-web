<template>
  <v-content>
    <v-container fluid grid-list-xl px-2 py-2>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <analysis-toolbar></analysis-toolbar>
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
import AnalysisToolbar from './AnalysisToolbar'
export default {
  name: 'AnalysisModule',
  data () {
    return {
    }
  },
  components: {
    AnalysisToolbar
  }
}
</script>

<style>
    
</style>