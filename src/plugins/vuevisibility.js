
import Vue from 'vue'
import visibility from 'vue-visibility-change'
import store from '../store'

// Activate global directives and methods
Vue.use(visibility)

// Add a handler to update vuex state when page becomes visible/invisible
const handler = visibility.change((event, hidden) => {
  store.commit('setAppVisible', !hidden)
});