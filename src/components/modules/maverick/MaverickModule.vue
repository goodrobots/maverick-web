<template lang='pug'>
div
  v-content
    router-view(:key="activeApi")
</template>

<script>
export default {
  name: "MaverickModule",
  data () {
    return {}
  },
  computed: {
    activeApi () {
      return this.$store.state.activeApi
    },
  }
};
</script>