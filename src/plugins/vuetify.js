import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

// export specific components for vuetoast
Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.base,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    }
  },
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'mdi',
  }
})
