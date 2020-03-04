<template lang='pug'>
v-card
  v-toolbar(:color="navColor")
    v-toolbar-title Modules - Enable/Disable
  v-container()
    div(v-for="(data, key) in $store.state.data.modules" :key="key")
      v-switch(v-model="data.enabled" :label="key | capitalize" :color="data.color")
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
