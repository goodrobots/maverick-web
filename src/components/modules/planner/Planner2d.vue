<template lang='pug'>
div.planner-map
  vl-map(ref="map" :load-tiles-while-animating="false" :load-tiles-while-interacting="false", :controls="{attribution: false, zoom: false}")
    vl-view(ref="mapView" :zoom.sync="mapZoom" :center.sync="xycenter" :rotation="0")

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

    // Interactions
    vl-interaction-select(:features.sync="selectedFeatures")
      template(slot-scope="select")
        // Select Styles
        vl-style-box
          vl-style-stroke(color="#423e9e" :width="7")
          vl-style-fill(:color="[254, 178, 76, 0.7]")
          vl-style-circle(:radius="5")
            vl-style-stroke(color="#423e9e" :width="7")
            vl-style-fill(:color="[254, 178, 76, 0.7]")
        vl-style-box(:z-index="1")
          vl-style-stroke(color="#d43f45" :width="2")
          vl-style-circle(:radius="5")
            vl-style-stroke(color="#d43f45" :width="2")

        // selected feature popup
        vl-overlay.feature-popup(v-for="feature in select.features" :key="feature.id" :id="feature.id"
                    :position="pointOnSurface(feature.geometry)" :auto-pan="true" :auto-pan-animation="{ duration: 300 }")
          template(slot-scope="popup")
            section.card
              header.card-header
                p.card-header-titl Feature ID {{ feature.id }}
                a.card-header-icon(title="Close" @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)")
                  span icon-close
              div.card-content
                div.content
                  p Overlay popup content for Feature with ID <strong>{{ feature.id }}</strong>
                  p Popup {{ JSON.stringify(popup) }}
                  p Feature {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}

    // Add marker for vehicle
    vl-layer-vector
      vl-source-vector(ref="vectorSource")
        vl-feature(:id="'v_' + api" v-for="(data, api) in navSatFixData" :key="'v_' + api" v-tooltip="'test'")
          vl-geom-point(v-if="data && 'longitude' in data" :coordinates="[data.longitude, data.latitude]")
          vl-style-box
            vl-style-circle(:radius="api == activeApi ? 6 : 4")
              vl-style-fill(:color="apis[api]['colorDark']")
              vl-style-stroke(color="#666666" :width="api == activeApi ? 2 : 1")

    // Add overlay for vehicle data
    // vl-overlay(v-if="mapVehicleInfo && activeApi in navSatFixData && navSatFixData[activeApi] && 'longitude' in navSatFixData[activeApi]" :position="[navSatFixData[activeApi].longitude + 0.0001, navSatFixData[activeApi].latitude]")
      template
        table.vehicle
          thead
            tr
              th(colspan=2) {{ apis[activeApi]['name'] }}
          tbody
            tr
              td Firmware
              td.value {{ vehicleInfoData[activeApi].autopilotString }}
            tr
              td Vehicle
              td.value {{ vehicleInfoData[activeApi].typeString }}
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
              td Mission Waypoints
              td.value(v-if="activeApi in missionActive") {{ missionActive[activeApi].total }}
              td.value(v-else) None

    // Add markers for mission waypoints
    vl-layer-vector
      vl-source-vector
        vl-feature(:id="'w_' + api" :ref="'w_' + api" v-for="(data, api) in missionActive" :key="'w_' + api")
          vl-geom-multi-point(v-if="data && data.mission && data.total > 0" :coordinates="data.mission.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
          vl-style-box
            vl-style-circle(:radius="api == activeApi ? 8 : 4")
              vl-style-fill(:color="apis[api]['colorLight']")
              vl-style-stroke(:color="apis[api]['colorDark']" :width="api == activeApi ? 2 : 1")
        // Add numbers for mission waypoint marker
        template(v-if="activeApi && selectedMission")
          vl-feature(v-if="missionActive[activeApi]" v-for="(waypoint, index) in missionActive[activeApi].mission" :key="'wn_' + index")
            vl-overlay(v-if="waypoint.longitude && waypoint.latitude" :position="[waypoint.longitude, waypoint.latitude]")
              span.markernumber.caption(v-html="index")
        // Add lines to join the markers
        template(v-if="activeApi && selectedMission")
          vl-feature(v-for="(waypoint, api) in missionActive" :id="'wl_' + api" :ref="'wl_' + api" :key="'wl_' + api")
            vl-geom-line-string(v-if="waypoint && waypoint.mission && waypoint.total > 0" :coordinates="waypoint.mission.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
            vl-style-box
              vl-style-stroke(:color="apis[api]['colorDark']")
              // vl-style-fill(:color="apis[api]['colorDark']")

  div.mapmenu
    v-menu(offset-x :close-on-content-click="false" :nudge-width="200" :nudge-right="10" v-model="mapmenu")
      v-btn(:color="navColor" slot="activator") Map Options
      v-card
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

  div.missionmenu(v-if="activeApi")
    v-menu(offset-y v-model="missionmenu")
      v-btn(:color="navColor" slot="activator") Mission Database
      v-list(two-line)
        v-list-tile(@click="selectedMission='loaded'")
          v-list-tile-content
            v-list-tile-title Loaded Mission
            v-list-tile-sub-title Waypoints: <strong>{{ missionActive[activeApi].total }}</strong>
      v-divider(inset)
      v-list(two-line subheader)
        v-subheader Database Missions
        v-list-tile(v-for="(mission, ix) in missionDatabaseData[activeApi].missions" :key="`mdb_${ix}`" @click="selectedMission=mission.id")
          v-list-tile-content
            v-list-tile-title {{ mission.id }}
            v-list-tile-sub-title Waypoints: {{ mission.total }}

  div.missionlist.scroll-y(v-if="activeApi && selectedMission")
    v-list(subheader two-line dense)
      v-subheader Mission Summary
      v-list-tile
        v-list-tile-content
          v-list-tile-title {{ missionActive[activeApi].id }}
          v-list-tile-sub-title Waypoints: <strong>{{ missionActive[activeApi].total }}</strong>
    v-divider
    v-list(subheader dense)
      v-subheader Mission Waypoints
      v-list-group(v-if="missionActive[activeApi]" v-for="(waypoint, ix) in missionActive[activeApi].mission" :key="`waypoint_${ix}`")
        v-list-tile(slot="activator")
          v-list-tile-content
            v-list-tile-title {{ waypoint.seq }}: <strong>{{ mavlinkEnum('MAV_CMD', waypoint.command) }}</strong>
        v-list-tile
          v-list-tile-content
            div Current? <strong>{{ waypoint.isCurrent }}</strong>
        v-list-tile
          v-list-tile-title Altitude: <strong>{{ waypoint.altitude }}</strong>
        v-list-tile
          v-list-tile-title Longitude: <strong>{{ waypoint.longitude }}</strong>
        v-list-tile
          v-list-tile-title Latitude: <strong>{{ waypoint.latitude }}</strong>
        v-list-tile
          v-list-tile-title AutoContinue: <strong>{{ waypoint.autocontinue }}</strong>
        v-list-tile
          v-list-tile-title Frame: <strong>{{ waypoint.frame }}</strong>
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { vehicleInfoQuery, vehicleInfoSubscription } from '../../../plugins/graphql/gql/VehicleInfo.gql'
import { missionListQuery, missionListSubscription } from '../../../plugins/graphql/gql/MissionList.gql'
import { missionDatabaseQuery, missionDatabaseSubscription } from '../../../plugins/graphql/gql/MissionDatabase.gql'

import { findPointOnSurface } from 'vuelayers/lib/ol-ext'

export default {
  data () {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,

      navSatFixData: {},
      vehicleInfoData: {},
      missionActive: {},
      missionDatabaseData: {},
      selectedMission: 'loaded',
      viewExtents: null,
      selectedFeatures: [],

      missionmenu: false,
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
        navSatFix: false
      },
      xycenter: [1, 1]
    }
  },

  // Use timers to set intervals for each message so we can limit the update frequency in the client
  // TOOD: Create tickers per vehicle, at the moment we still have a single global ticker
  timers: {
    setTickers: { time: 500, autostart: true, repeat: true }
  },

  computed: {
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

  watch: {
    // Watch apis state for any change and process
    apis: {
      handler: function (newValue) {
        this.createQlQueries()
      }
    },
    centercoords: {
      handler: function (newValue) {
        // If mapcenter option set, or centercoords empty, and single api has been chosen, set centercoords from current position
        if (
          (this.mapCenter || (!this.xycenter || this.xycenter.length === 0)) &&
          this.activeApi
        ) {
          if (newValue.length !== 0 && this.$refs.mapView.$view) {
            this.$refs.mapView.animate({ center: newValue })
            this.xycenter = newValue
          }
        }
      }
    },
    navSatFixData: {
      handler: function (newValue, oldValue) {
        // Fit mapview to show all vehicles, if mapcenter is selected, or on first load, and if a single api has not been chosen (which gets priority)
        if (
          (this.mapCenter || !this.viewExtents || this.viewExtents.length === 0)
        ) {
          // Fetch extents of the vector source layer
          this.viewExtents = this.$refs.vectorSource.$source.getExtent()
          // If there is a finite extent, then fit the view (fits all vehicles within view)
          if (!this.viewExtents.includes(Infinity)) {
            this.$refs.mapView.$view.fit(this.viewExtents, {
              size: this.$refs.map.$map.getSize(),
              duration: 50
            })
          }
        }
      },
      deep: true
    },
    selectedMission: {
      handler: function (newValue, oldValue) {
        // We have to destroy and recreate the mission query and subscription, because vue-apollo reactive variables aren't working correctly
        // Remove old query and subscription
        this.$apollo.queries[this.activeApi + '___MissionList___' + oldValue] = null
        this.$apollo.subscriptions[this.activeApi + '___MissionList___' + oldValue] = null
        // Create new query and subscription
        this.createQuery('MissionList', missionListQuery, this.activeApi, 'missionActive', !this.apis[this.activeApi].state, null, null, { id: this.selectedMission })
        this.createSubscription('MissionList', missionListSubscription, this.activeApi, 'missionActive', !this.apis[this.activeApi].state, null, null, { id: this.selectedMission })
      }
    }
  },

  mounted () {
    this.createQlQueries()
  },

  methods: {
    setTickers () {
      this.tickers.navSatFix = true
    },
    createQlQueries () {
      for (const api in this.apis) {
        this.createQuery('NavSatFix', navSatFixQuery, api, 'navSatFixData', !api.state)
        this.createSubscription('NavSatFix', navSatFixSubscription, api, 'navSatFixData', !api.state)
        this.createQuery('VehicleInfo', vehicleInfoQuery, api, 'vehicleInfoData', !api.state, null, null, { uuid: '' })
        this.createSubscription('VehicleInfo', vehicleInfoSubscription, api, 'vehicleInfoData', !api.state, null, null, { uuid: '' })
        this.createQuery('MissionList', missionListQuery, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createSubscription('MissionList', missionListSubscription, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createQuery('MissionDatabase', missionDatabaseQuery, api, 'missionDatabaseData', null, null, null, { id: '' })
        this.createSubscription('MissionDatabase', missionDatabaseSubscription, api, 'missionDatabaseData', null, null, null, { id: '' })
      }
    },
    waypointCommand (command) {
      // Define command mappings
      const commands = {
        16: 'Waypoint',
        21: 'Land',
        22: 'Takeoff',
        82: 'Spline Waypoint'
      }
      // Return command text if available
      if (command in commands) {
        return commands[command]
      } else {
        return command
      }
    },
    pointOnSurface: findPointOnSurface
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
.missionmenu {
  position: absolute;
  bottom: 25px;
  left: 175px;
}
.missionlist {
  position: absolute;
  top: 75px;
  left: 25px;
  max-height: 75vh;
}
.markernumber {
  position: relative;
  left: -5px;
  top: -10px;
  color: #fff;
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
