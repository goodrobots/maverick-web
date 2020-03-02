<template lang='pug'>
div
  div(v-for="(data, key) in $store.state.modules" :key="key")
    v-switch(v-model="data.enabled" :label="key" :color="data.color")
      v-icon(right) {{ data.icon }}
</template>
<script>
export default {
  name: "ConfigModules",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
