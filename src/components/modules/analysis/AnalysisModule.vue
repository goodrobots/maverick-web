<template lang='pug'>
div
  v-content
    router-view(:key="activeApi")
</template>

<script>
export default {
  name: 'AnalysisModule',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  }
}
</script>

<style>
</style>
