
import Vue from 'vue'
import VueVisibility from 'vue-visibility-change'
import store from '../store'

// Activate global directives and methods
Vue.use(VueVisibility)

// Add a handler to update vuex state when page becomes visible/invisible
const handler = VueVisibility.change((event, hidden) => {
  store.commit('setAppVisible', !hidden)
});