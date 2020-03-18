import Vue from 'vue'
import VueLodash from 'vue-lodash'

import round from 'lodash/round'
import delay from 'lodash/delay'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import toInteger from 'lodash/toInteger'
import orderBy from 'lodash/orderBy'

// Activate lodash under standard naming - this._.
Vue.use(VueLodash, { lodash: { round, orderBy, toInteger, isEqual, differenceWith, delay } })

