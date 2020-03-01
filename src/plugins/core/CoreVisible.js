const plugin = {
  install(Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Installing CoreVisible plugin')
    }

    Vue.mixin({
      computed: {
        appVisible () {
          if (this.$store) {
            return this.$store.state.appVisible
          } else {
            return false
          }
        }
      }
    })
  }
}

export const CoreVisible = plugin