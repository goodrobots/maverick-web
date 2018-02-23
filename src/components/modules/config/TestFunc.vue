<template functional lang='pug'>
  v-container
    div TEST 
    div {{ parent.$data.test }}
</template>

<script>
export default {
  name: 'TestFunc'
}
</script>