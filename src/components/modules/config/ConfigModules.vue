<template lang='pug'>
v-card
  v-toolbar(color="primary lighten-1" dense)
    v-toolbar-title Web Modules
  v-container
    v-row(v-for="(data, key) in $store.state.core.modules" :key="key")
      v-switch.mx-4(v-model="$store.state.data.modulesActive[key]" :color="data.color" :disabled="!data.enabled || key=='config'")
        template(v-slot:label)
          span.ml-4 {{ key | capitalize }}
          v-icon(right) {{ data.icon }}
          span.ml-6(v-if="!data.enabled") (Coming Soon!)
          span.ml-6(v-if="key=='config'") (Always Enabled)
</template>
<script>
export default {
  name: "ConfigModules"
}
</script>
