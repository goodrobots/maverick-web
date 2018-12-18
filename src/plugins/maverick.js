import Vue from 'vue'
import { MaverickApi } from './maverick/MaverickApi'
import { MaverickLog } from './maverick/MaverickLog'

// Load log plugin
Vue.use(MaverickLog)

// Load api plugin
Vue.use(MaverickApi)
