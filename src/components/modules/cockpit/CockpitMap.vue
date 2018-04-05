<template lang='pug'>
div.cockpit-map
  vl-map(ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true", :controls="{attribution: false, zoom: true}")
    vl-view(v-if="xy.length > 0" :zoom="14" :center="xy" :rotation="0")
    vl-feature(id="marker" ref="marker" :properties="{prop: 'value', prop2: 'value'}")
      vl-geom-point(v-if="xy.length > 0" :coordinates="xy")
    vl-layer-tile(id="osm")
      vl-source-osm
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../graphql/gql/NavSatFixMessage.gql'
import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
Vue.use(VueLayers)

export default {
  data () {
    return {
      navSatFixMessage: []
    }
  },

  computed: {
    activeApi () { return this.$store.state.activeApi },
    // xy computes EPSG:3857 coordinates from EPSG:4326.  If both x,y are not values then return nothing as vl components get upset otherwise
    xy () {
      const xy = VueLayers.core.projHelper.fromLonLat([this.navSatFixMessage.longitude, this.navSatFixMessage.latitude])
      return (xy[0] && xy[1]) ? xy : []
    }
  },

  apollo: {
    $client () { return this.activeApi },
    navSatFixMessage: {
      query: navSatFixQuery,
      subscribeToMore: {
        document: navSatFixSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            navSatFixMessage: subscriptionData.data.navSatFixMessage
          }
        }
      }
    }
  }

}
</script>

<style scoped>
.cockpit-map {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 75px;
  height: 25%;
  max-width: 50%;
  z-index: 10;
}
</style>