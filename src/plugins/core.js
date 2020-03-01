import Vue from 'vue'
import { CoreApi } from './core/CoreApi'
import { CoreLog } from './core/CoreLog'
import { CoreVisible } from './core/CoreVisible'

// Load log plugin
Vue.use(CoreLog)

// Load api plugin
Vue.use(CoreApi)

// Load visible plugin
Vue.use(CoreVisible)