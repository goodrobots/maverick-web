<template lang='pug'>
div.cockpit-map
  vl-map.vlmap(ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true", :controls="{attribution: false, zoom: true}")
    vl-view(v-if="xy.length > 0" :zoom="14" :center="xy" :rotation="0")
    // Add markers for mission waypoints
    vl-feature
      vl-geom-multi-point(v-if="waypoints.length > 0" :coordinates="waypoints.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
      vl-style-box
        vl-style-circle(:radius="10")
          vl-style-fill(color="rgba(35,245,35,0.5)")
          vl-style-stroke(color="#666666" :width="1")
    // Add numbers for mission waypoint marker
    vl-feature(v-if="waypoints.length > 0" v-for="(waypoint, index) in waypoints" :key="'markernumber'+index")
      vl-overlay(v-if="waypoint.longitude && waypoint.latitude" :position="[waypoint.longitude, waypoint.latitude]")
        span.markernumber.caption(v-html="index")
    // Add lines to join the markers
    vl-feature
      vl-geom-line-string(v-if="waypoints.length > 0" :coordinates="waypoints.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
    // Add marker for vehicle
    vl-feature(id="vehiclemarker" ref="vehiclemarker")
      vl-geom-point(v-if="xy.length > 0" :coordinates="xy")
      vl-style-box
        vl-style-circle(:radius="6")
          vl-style-fill(color="rgba(245,35,35,0.8)")
          vl-style-stroke(color="#666666" :width="1")
    // Draw map layer
    vl-layer-tile
      vl-source-xyz(key="googleterrain" url="http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}")
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../graphql/gql/NavSatFixMessage.gql'
import { waypointsQuery, waypointsSubscription } from '../../../graphql/gql/Waypoints.gql'

export default {
  data () {
    return {
      navSatFixMessage: [],
      waypoints: []
    }
  },

  computed: {
    activeApi () { return this.$store.state.activeApi },
    bingMapsKey () { return this.$store.state.bingMapsKey },
    // xy computes EPSG:3857 coordinates from EPSG:4326.  If both x,y are not values then return nothing as vl components get upset otherwise
    xy () {
      // const xy = VueLayers.core.projHelper.fromLonLat([this.navSatFixMessage.longitude, this.navSatFixMessage.latitude])
      const xy = [this.navSatFixMessage.longitude, this.navSatFixMessage.latitude]
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
    },
    waypoints: {
      query: waypointsQuery,
      subscribeToMore: {
        document: waypointsSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          const update = subscriptionData.data.waypoints
          console.log(previousResult)
          console.log(update)
          const waypointData = {
            waypoints: previousResult.waypoints.map(waypoint => {
              // We can't update immutable apollo data, so instead create a deep copy and return that into the array map
              if (waypoint.id === update.id) {
                let copy = JSON.parse(JSON.stringify(waypoint))
                copy.value = update.value
                return copy
              // Otherwise return the array object by reference
              } else {
                return waypoint
              }
            })
          }
          return waypointData
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
  border: 2px solid white;
  border-radius: 10px;
}
.vlmap {
    border-radius: 5px;
    overflow: hidden;
}
.vlmap div canvas{
    border-radius: 5px;
}
.markernumber {
  position: relative;
  left: -5px;
  top: -10px;
  color: #333;
}
</style>