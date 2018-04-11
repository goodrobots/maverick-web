<template lang='pug'>
div.planner-map
  vl-map(data-projection="EPSG:4326" ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true", :controls="{attribution: false, zoom: false}")
    vl-view(v-if="xycenter.length > 0" :zoom="mapZoom" :center="xycenter" :rotation="0")
    // Add marker for vehicle
    vl-feature(id="vehiclemarker" ref="vehiclemarker" :properties="{prop: 'value', prop2: 'value'}")
      vl-geom-point(v-if="xy.length > 0" :coordinates="xy")
      vl-style-box
        vl-style-circle(:radius="6")
          vl-style-fill(color="rgba(245,35,35,0.8)")
          vl-style-stroke(color="#666666" :width="1")
    // Add markers for mission waypoints
    vl-feature(v-for="(waypoint, index) in waypoints" :key="'marker'+index" :properties="{prop: 'value', prop2: 'value'}")
      vl-geom-point(:coordinates="[waypoint.longitude, waypoint.latitude]")
      vl-style-box
        vl-style-circle(:radius="10")
          vl-style-fill(color="rgba(35,245,35,0.5)")
          vl-style-stroke(color="#666666" :width="1")
    // Add numbers for mission waypoint marker
    vl-feature(v-for="(waypoint, index) in waypoints" :key="'markernumber'+index" :properties="{prop: 'value', prop2: 'value'}")
      vl-overlay(:position="[waypoint.longitude, waypoint.latitude]")
        span.markernumber.caption(v-html="index")
    // Add lines to join the markers
    vl-feature
      vl-geom-line-string(:coordinates="waypoints.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
    // Draw the map layer
    vl-layer-tile(v-if="mapLayer=='osm'")
      vl-source-osm
    vl-layer-tile(v-if="mapLayer=='bingroad'")
      vl-source-bing-maps(:api-key="bingMapsKey" imagery-set="Road" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='bingsatellite'")
      vl-source-bing-maps(:api-key="bingMapsKey" imagery-set="Aerial" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='binghybrid'")
      vl-source-bing-maps(:api-key="bingMapsKey" imagery-set="AerialWithLabels" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='bingbirdseye'")
      vl-source-bing-maps(:api-key="bingMapsKey" imagery-set="BirdseyeV2WithLabels" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='googleroad'")
      vl-source-xyz(key="googleroad" url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googlesatellite'")
      vl-source-xyz(key="googlesatellite" url="http://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googlehybrid'")
      vl-source-xyz(key="googlehybrid" url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googleterrain'")
      vl-source-xyz(key="googleterrain" url="http://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}")
  div.mapmenu
    v-menu(offset-x :close-on-content-click="false" :nudge-width="200" :nudge-right="10" v-model="mapmenu")
      v-btn(:color="navColor" slot="activator") Map Options
      v-card
        v-card-text
          v-layout(row wrap)
            v-flex(xs3)
              v-subheader.subheading Zoom
            v-flex(xs9)
              v-slider(v-model="mapZoom" :min="1" :max="21" :step="1" thumb-label)
          v-divider
          v-layout(row wrap)
            v-flex(xs3)
              v-subheader.subheading Layer
            v-flex(xs9)
              v-select(:items="maplayers" overflow v-model="mapLayer" label="Map Layer")
          v-layout(row wrap)
            v-flex(xs3)
              v-subheader.subheading Center
            v-flex(xs9)
              v-switch(v-model="mapCenter" color="primary")
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../graphql/gql/NavSatFixMessage.gql'
import { waypointsQuery, waypointsSubscription } from '../../../graphql/gql/Waypoints.gql'
import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})

export default {
  data () {
    return {
      navSatFixMessage: [],
      waypoints: [],
      centercoords: [],
      mapmenu: false,
      maplayers: [
        { value: 'osm', text: 'OpenStreetMap' },
        { value: 'bingroad', text: 'Bing Roadmap' },
        { value: 'bingsatellite', text: 'Bing Satellite' },
        { value: 'binghybrid', text: 'Bing Hybrid' },
        { value: 'googleroad', text: 'Google Roadmap' },
        { value: 'googlesatellite', text: 'Google Satellite' },
        { value: 'googlehybrid', text: 'Google Hybrid' },
        { value: 'googleterrain', text: 'Google Terrain' }
      ]
    }
  },

  computed: {
    bingMapsKey () { return this.$store.state.bingMapsKey },
    activeApi () { return this.$store.state.activeApi },
    navColor () { return this.$store.state.navColor },
    mapCenter: {
      get () { return this.$store.state.planner.mapCenter },
      set (value) { return this.$store.commit('planner/setMapCenter', value) }
    },
    mapLayer: {
      get () { return this.$store.state.planner.mapLayer },
      set (value) { return this.$store.commit('planner/setMapLayer', value) }
    },
    mapZoom: {
      get () { return this.$store.state.planner.mapZoom },
      set (value) { this.$store.commit('planner/setMapZoom', value) }
    },
    xy () {
      // xy computes EPSG:3857 coordinates from EPSG:4326.  If both x,y are not values then return nothing as vl components get upset otherwise
      // const xy = VueLayers.core.projHelper.fromLonLat([this.navSatFixMessage.longitude, this.navSatFixMessage.latitude])
      // Note: This is no longer necessary, instead set data-projection in the vl-map component use
      const xy = [this.navSatFixMessage.longitude, this.navSatFixMessage.latitude]
      return (xy[0] && xy[1]) ? xy : []
    },
    xycenter () {
      // If follow option set, or centercoords empty, set centercoords from current position
      if (this.mapCenter || (this.centercoords.length === 0 && this.xy.length > 0)) {
        this.centercoords = this.xy
      }
      return this.centercoords
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
  },

  watch: {
    waypoints () {
      /*
      console.log('Waypoints: ')
      console.log(this.waypoints)
      // const coords = this.waypoints.filter(function (x) { if (x.longitude && x.latitude) return [x.longitude, x.latitude] })
      const coords = this.waypoints.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])
      console.log(coords)
      */
    }
  }
}
</script>

<style scoped>
.planner-map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.mapmenu {
  position: absolute;
  bottom: 50px;
  left: 50px;
}
.markernumber {
  position: relative;
  left: -5px;
  top: -10px;
  color: #333;
}
</style>