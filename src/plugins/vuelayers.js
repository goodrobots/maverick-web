import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

// Import vuelayers and declare global projection to gps standard
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})
