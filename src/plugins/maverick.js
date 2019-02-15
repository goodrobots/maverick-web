import Vue from 'vue'
import { MaverickApi } from './maverick/MaverickApi'
import { MaverickLog } from './maverick/MaverickLog'
import { MaverickVisible } from './maverick/MaverickVisible'

// Load log plugin
Vue.use(MaverickLog)

// Load api plugin
Vue.use(MaverickApi)

// Load visible plugin
Vue.use(MaverickVisible)