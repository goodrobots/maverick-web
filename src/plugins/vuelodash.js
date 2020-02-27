import Vue from 'vue'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// Activate lodash under standard naming - this._.
Vue.use(VueLodash, { lodash: lodash })

