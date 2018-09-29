import Vue from 'vue'
import Vuetify from 'vuetify'

// Import custom styles to override Vuetify defaults
import '../stylus/main.styl'

// import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3
  },
  iconfont: 'md'
})
