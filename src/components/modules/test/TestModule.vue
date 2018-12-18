<template lang='pug'>
v-content
  v-container(fluid fill-height)
    v-layout(align-center justify-center)
      v-flex(xs12 sm6 md6)
        table
          tr(v-for="(data, api) in apis")
            td {{ api }}
            td: strong {{ data }}
            td(v-html="statusData[api]")
</template>

<script>

export default {
  name: 'TestModule',
  computed: {
    statusData () {
      return this.$store.state.statusData
    }
  }
}
</script>
