<template lang='pug'>
div.planner-map
  vl-map(ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true", :controls="{attribution: false, zoom: false}")
    vl-view(v-if="xycenter && xycenter.length > 0" :zoom="mapZoom" :center="xycenter" :rotation="0")
    // Add markers for mission waypoints
    vl-feature(:id="'w_' + api" :ref="'w_' + api" v-for="(data, api) in waypointsData" :key="'w_' + api")
      vl-geom-multi-point(v-if="data && data.length > 0" :coordinates="data.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
      vl-style-box
        vl-style-circle(:radius="api == activeApi ? 8 : 4")
          vl-style-fill(:color="apis[api]['color-light']")
          vl-style-stroke(:color="apis[api]['color-dark']" :width="api == activeApi ? 2 : 1")
    // Add numbers for mission waypoint marker
    vl-feature(v-for="(data, index) in waypointsData[activeApi]" :key="'wn_' + index")
      vl-overlay(v-if="data.longitude && data.latitude" :position="[data.longitude, data.latitude]")
        span.markernumber.caption(v-html="index")
    // Add lines to join the markers
    vl-feature(:id="'wl_' + api" :ref="'wl_' + api" v-for="(data, api) in waypointsData" :key="'wl_' + api")
      vl-geom-line-string(v-if="data && data.length > 0" :coordinates="data.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
      vl-style-box
        vl-style-stroke(:color="apis[api]['color-dark']")
        // vl-style-fill(:color="apis[api]['color-dark']")
    // Add marker for vehicle
    vl-feature(:id="'v_' + api" :ref="'v_' + api" v-for="(data, api) in navSatFixData" :key="'v_' + api")
      vl-geom-point(v-if="data && 'longitude' in data" :coordinates="[data.longitude, data.latitude]")
      vl-style-box
        // vl-style-icon(src="red.png" :scale="0.5" :anchor="[0.5, 1]")
        vl-style-circle(:radius="api == activeApi ? 6 : 4")
          vl-style-fill(:color="apis[api]['color-dark']")
          vl-style-stroke(color="#666666" :width="api == activeApi ? 2 : 1")
    // Add overlay for vehicle data
    vl-overlay(v-if="mapVehicleInfo && activeApi in navSatFixData && navSatFixData[activeApi] && 'longitude' in navSatFixData[activeApi]" :position="[navSatFixData[activeApi].longitude + 0.0003, navSatFixData[activeApi].latitude]")
      template
        table.vehicle
          thead
            tr
              th(colspan=2) {{ apis[activeApi]['name'] }}
          tbody
            tr
              td Longitude
              td.value {{ navSatFixData[activeApi].longitude.toFixed(6) }}
            tr
              td Latitude
              td.value {{ navSatFixData[activeApi].latitude.toFixed(6) }}
            tr
              td Altitude
              td.value {{ navSatFixData[activeApi].altitude.toFixed(2) }}
            tr
              td Waypoints
              td.value(v-if="activeApi in waypointsData") {{ waypointsData[activeApi].length }}
              td.value(v-else) None
    // Draw the map layer
    vl-layer-tile(v-if="mapLayer=='osm'")
      vl-source-osm
    vl-layer-tile(v-if="mapLayer=='bingroad'")
      vl-source-bingmaps(:api-key="bingMapsKey" imagery-set="Road" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='bingsatellite'")
      vl-source-bingmaps(:api-key="bingMapsKey" imagery-set="Aerial" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='binghybrid'")
      vl-source-bingmaps(:api-key="bingMapsKey" imagery-set="AerialWithLabels" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='bingbirdseye'")
      vl-source-bingmaps(:api-key="bingMapsKey" imagery-set="BirdseyeV2WithLabels" hidpi=true )
    vl-layer-tile(v-if="mapLayer=='googleroad'")
      vl-source-xyz(key="googleroad" url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googlesatellite'")
      vl-source-xyz(key="googlesatellite" url="https://mt1.google.com/vt/lyrs=s&hl=pl&&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googlehybrid'")
      vl-source-xyz(key="googlehybrid" url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}")
    vl-layer-tile(v-if="mapLayer=='googleterrain'")
      vl-source-xyz(key="googleterrain" url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}")
  div.mapmenu
    v-menu(offset-x :close-on-content-click="false" :nudge-width="200" :nudge-right="10" v-model="mapmenu")
      v-btn(:color="navColor" slot="activator") Map Options
      v-card
        // v-list
          v-list-tile
            v-list-tile-title Zoom
            v-list-tile-action
              v-slider(v-model="mapZoom" :min="1" :max="21" :step="1" thumb-label)
          v-list-tile
            v-list-tile-title Center
            v-list-tile-action
              v-switch(v-model="mapCenter" color="primary")
          v-list-tile
            v-list-tile-title Map Layer
            v-list-tile-action
              v-select(:items="maplayers" v-model="mapLayer")
        v-card-text
          v-layout(row wrap)
            v-flex(xs12)
              .v-input.v-input--slider.v-input--slider--thumb-label.v-input--is-label-active.v-input--is-dirty
                .v-input__control
                  .v-input__slot
                    label.v-label Vehicle Info
                    v-switch(v-model="mapVehicleInfo" color="primary")
          v-layout(row wrap)
            v-flex(xs12)
              .v-input.v-input--slider.v-input--slider--thumb-label.v-input--is-label-active.v-input--is-dirty
                .v-input__control
                  .v-input__slot
                    label.v-label Center
                    v-switch(v-model="mapCenter" color="primary")
          v-layout(row wrap)
            v-flex(xs12)
              .v-input.v-input--slider.v-input--slider--thumb-label.v-input--is-label-active.v-input--is-dirty
                .v-input__control
                  .v-input__slot
                    label.v-label Zoom
                    v-slider(v-model="mapZoom" :min="1" :max="21" :step="1" thumb-label)
          v-layout(row wrap)
            v-flex(xs12)
              .v-input.v-input--slider.v-input--slider--thumb-label.v-input--is-label-active.v-input--is-dirty
                .v-input__control
                  .v-input__slot
                    label.v-label Map Type
                    // v-overflow-btn(:items="maplayers" v-model="mapLayer" label="Map Layer")
                    v-select(:items="maplayers" v-model="mapLayer")
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { waypointsQuery, waypointsSubscription } from '../../../plugins/graphql/gql/Waypoints.gql'

export default {
  data () {
    return {
      navSatFixData: {},
      waypointsData: {},
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
      ],
      tickers: {
        navSatFixMessage: false
      }
    }
  },

  // Use timers to set intervals for each message so we can limit the update frequency in the client
  // TOOD: Create tickers per vehicle, at the moment we still have a single global ticker
  timers: {
    setTickers: { time: 500, autostart: true, repeat: true }
  },

  computed: {
    apis () {
      return this.$store.state.apis
    },
    activeApi () {
      return this.$store.state.activeApi
    },
    bingMapsKey () {
      return this.$store.state.bingMapsKey
    },
    centercoords () {
      let xy = []
      if (this.activeApi in this.navSatFixData && this.navSatFixData[this.activeApi] && 'longitude' in this.navSatFixData[this.activeApi] && this.navSatFixData[this.activeApi].longitude > 0) {
        xy = [
          this.navSatFixData[this.activeApi].longitude,
          this.navSatFixData[this.activeApi].latitude
        ]
      }
      return xy
    },
    xycenter () {
      // If follow option set, or centercoords empty, set centercoords from current position
      if (
        this.mapCenter ||
        // (this.xycenter.length === 0 && xy.length > 0)
        this.centercoords.length > 0
      ) {
        return this.centercoords
      }
    },
    navColor () {
      return this.$store.state.navColor
    },
    mapVehicleInfo: {
      get () {
        return this.$store.state.planner.mapVehicleInfo
      },
      set (value) {
        return this.$store.commit('planner/setMapVehicleInfo', value)
      }
    },
    mapCenter: {
      get () {
        return this.$store.state.planner.mapCenter
      },
      set (value) {
        return this.$store.commit('planner/setMapCenter', value)
      }
    },
    mapLayer: {
      get () {
        return this.$store.state.planner.mapLayer
      },
      set (value) {
        return this.$store.commit('planner/setMapLayer', value)
      }
    },
    mapZoom: {
      get () {
        return this.$store.state.planner.mapZoom
      },
      set (value) {
        this.$store.commit('planner/setMapZoom', value)
      }
    }
  },

  /*
  created () {
    // Iterate through each configured API backend
    for (var api in this.$store.state.apis) {
      // Add a navSatFix SmartQuery for this API backend
      this.$apollo.addSmartQuery('navSatFixMessage_' + api, {
        client: api,
        query: navSatFixQuery,
        manual: true,
        result: function (data, key) {
          // Note: Must use this.$set to add object property, to keep new property reactive
          this.$set(this.navSatFixData, api, data.data.navSatFixMessage)
          // Update map center coordinates
          this.centercoords()
        }
      })
      // Add a waypoints SmartQuery for this API backend
      this.$apollo.addSmartQuery('waypoints_' + api, {
        client: api,
        query: waypointsQuery,
        manual: true,
        result: function (data, key) {
          // Note: Must use this.$set to add object property, to keep new property reactive
          this.$set(this.waypointsData, key.replace('waypoints_', ''), data.data.waypoints)
        }
      })
      // Add a navSatFixMessage SmartSubscription for this API backend
      this.$apollo.addSmartSubscription('navSatFixMessage_' + api, {
        client: api,
        query: navSatFixSubscription,
        manual: true,
        result: function (data, key) {
          // Only update if position has changed and ticker is turned on
          if (
            this.navSatFixData[key.replace('navSatFixMessage_', '')] !== data.data.navSatFixMessage &&
            this.tickers.navSatFixMessage
          ) {
            // console.log(`Updating ${key} with ${data.data.navSatFixMessage.longitude}|${data.data.navSatFixMessage.latitude}|${data.data.navSatFixMessage.altitude}`)
            this.navSatFixData[key.replace('navSatFixMessage_', '')] = data.data.navSatFixMessage
            this.tickers.navSatFixMessage = false // Turn the ticker off until the next interval
            // Update map center coordinates
            this.centercoords()
            // Mark the api state to active if not already set
            const api = key.replace('navSatFixMessage_', '')
            if (!this.$store.state.apis[api].state && 'navSatFixMessage' in data.data && data.data.navSatFixMessage.longitude) {
              // console.log(`setting state to true for api ${api}`)
              this.$store.commit('setApiState', {
                api: api,
                value: true
              })
            } else if (this.$store.state.apis[api].state && (!('navSatFixMessage' in data.data) && !data.data.navSatFixMessage.longitude)) {
              // console.log(`setting state to false for api ${api}`)
              this.$store.commit('setApiState', {
                api: api,
                value: false
              })
            }
            // console.log(this.apis)
          }
        },
        skip () {
          return this.apis[api].state
        }
      })
      // Add a waypoints SmartSubscription for this API backend
      this.$apollo.addSmartSubscription('waypoints_' + api, {
        client: api,
        query: waypointsSubscription,
        manual: true,
        result: function (data, key) {
          this.waypointsData[key.replace('waypoints_', '')] = data.data.waypoints
          console.log(`Updating ${key.replace('waypoints_', '')} with ${data.data.waypoints}`)
        },
        skip () {
          return this.apis[api].state
        }
      })
    }
  },
  */

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        for (const api in this.apis) {
          this.createQuery('NavSatFixMessage', navSatFixQuery, api, 'navSatFixData')
          this.createQuery('Waypoints', waypointsQuery, api, 'waypointsData')
          this.createSubscription('NavSatFixMessage', navSatFixSubscription, api, 'navSatFixData')
          this.createSubscription('Waypoints', waypointsSubscription, api, 'waypointsData')
        }
      }
    }
  },

  methods: {
    setTickers () {
      this.tickers.navSatFixMessage = true
    }
    /*
    centercoords () {
      let xy = []
      if (this.activeApi in this.navSatFixData && this.navSatFixData[this.activeApi] && 'longitude' in this.navSatFixData[this.activeApi] && this.navSatFixData[this.activeApi].longitude > 0) {
        xy = [
          this.navSatFixData[this.activeApi].longitude,
          this.navSatFixData[this.activeApi].latitude
        ]
      }
      // If follow option set, or centercoords empty, set centercoords from current position
      if (
        this.mapCenter ||
        (this.xycenter.length === 0 && xy.length > 0)
      ) {
        this.xycenter = xy
      }
    }
    */
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
  bottom: 25px;
  left: 25px;
}
.markernumber {
  position: relative;
  left: -5px;
  top: -10px;
  color: #333;
}
table.vehicle {
  background-color: rgba(33, 33, 33, 0.5);
  border: none;
  color: #fff
}
table.vehicle thead tr {
  background-color: rgba(33, 33, 33, 0.8)
}
table.vehicle td.value {
  font-weight: bold;
}
</style>
