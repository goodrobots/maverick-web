<template lang='pug'>
div.planner-map
  vl-map(ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true" :controls="{attribution: false, zoom: false}")
    vl-view(ref="mapView" :zoom.sync="mapZoom" :center.sync="xycenter" :rotation="0" projection="EPSG:4326")

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
      // template(slot-scope="select")
        // selected feature popup
        vl-overlay.feature-popup(v-for="feature in select.features" :key="feature.id" :id="feature.id" :position="pointOnSurface(feature.geometry)" :auto-pan="false" :auto-pan-animation="{ duration: 300 }")
          template(slot-scope="popup")
            div Hello
            div {{ feature }}
            // v-popover(trigger="manual" open=true offset="16")
              // button.tooltip-target.b3 Click me
              div.tooltip-target.b1 Hello
              template(slot="popover")
                div Hello this is a tests sdf
                a(v-close-popover) Close
            // section.card
              header.card-header
                p.card-header-title Feature ID {{ feature.id }}
                a.card-header-icon(title="Close" @click="selectedFeatures = selectedFeatures.filter(f => f.id !== feature.id)")
                  span icon-close
              div.card-content
                div.content
                  p Overlay popup content for Feature with ID <strong>{{ feature.id }}</strong>
                  p Popup {{ JSON.stringify(popup) }}
                  p Feature {{ JSON.stringify({ id: feature.id, properties: feature.properties }) }}

    // Add marker for vehicles
    vl-layer-vector(declutter=true)
      vl-source-vector(ref="vehicleLayer")
        vl-feature(:id="'v_' + api" v-for="(data, api) in navSatFixData" :key="'v_' + api")
          vl-geom-point(v-if="data && 'longitude' in data" :coordinates="[data.longitude, data.latitude]")
          vl-style-box
            vl-style-icon(:src="vehicleIcon(vehicleData[api].typeString)" :anchor="[0.5, 1]" :scale="api == activeApi ? 1 : 0.5" :opacity="api == activeApi ? 1 : 0.75" v-tooltip="'test'")
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

    // Display mission waypoints
    template(v-if="activeApi && selectedMission")
      vl-layer-vector(declutter=true)
        vl-source-vector(ref="waypointLayer")
          vl-feature(v-if="missionActive[activeApi]" v-for="(waypoint, index) in missionActive[activeApi].mission" :id="'w_' + index" :key="'w_' + index")
            vl-geom-point(v-if="waypoint.longitude && waypoint.latitude" :coordinates="[waypoint.longitude, waypoint.latitude]")
            vl-style-box
              vl-style-circle(:radius=11)
                vl-style-fill(:color="apis[activeApi]['colorLight']")
                vl-style-stroke(:color="apis[activeApi]['colorDark']" :width=2)
          // Add lines to join the markers
          vl-feature(v-if="missionActive[activeApi]")
            vl-geom-line-string(v-if="missionActive[activeApi].mission.length > 0" :coordinates="missionActive[activeApi].mission.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
            vl-style-box
              vl-style-stroke(:color="apis[activeApi]['colorDark']")
              vl-style-fill(:color="apis[activeApi]['colorDark']")
          // Add numbers for mission waypoint marker
          vl-feature(v-if="missionActive[activeApi]" v-for="(waypoint, index) in missionActive[activeApi].mission" :key="'wm_' + index")
            vl-overlay(v-if="waypoint.longitude && waypoint.latitude" :position="[waypoint.longitude, waypoint.latitude]")
              span.markernumber.caption(v-html="index")

  // Display mapview menu
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

  // If api chosen, display a mission database menu
  div.missionmenu(v-if="activeApi")
    v-menu(offset-y v-model="missionmenu")
      v-btn(:color="navColor" slot="activator") Mission Database
      v-list(two-line)
        v-list-tile(@click="selectedMission='loaded'")
          v-list-tile-content
            v-list-tile-title Loaded Mission
            v-list-tile-sub-title Waypoints: <strong>{{ missionLoaded[activeApi].total }}</strong>
      v-divider(inset)
      v-list(two-line subheader)
        v-subheader Database Missions
        v-list-tile(v-for="(mission, ix) in missionDatabaseData[activeApi].missions" :key="`mdb_${ix}`" @click="selectedMission=mission.id")
          v-list-tile-content
            v-list-tile-title {{ mission.id }}
            v-list-tile-sub-title Waypoints: {{ mission.total }}

  // If api chosen, display a mission list
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
            v-list-tile-title {{ waypoint.seq }}: <strong>{{ mavlinkEnum('MAV_CMD', waypoint.command).replace("NAV_", "") }}</strong>
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
      missionActive: {},
      missionLoaded: {},
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
    vehicleLocation () {
      let xy = []
      if (this.activeApi in this.navSatFixData && this.navSatFixData[this.activeApi] && 'longitude' in this.navSatFixData[this.activeApi] && this.navSatFixData[this.activeApi].longitude > 0) {
        xy = [
          Math.round(this.navSatFixData[this.activeApi].longitude * 100) / 100,
          Math.round(this.navSatFixData[this.activeApi].latitude * 100) / 100
        ]
      }
      return xy
    },
    vehicleData () {
      return this.$store.state.vehicleData
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
    activeApi (newValue, oldValue) {
      // If the selected api changes, reset selected mission to default 'loaded'
      const oldMission = this.selectedMission
      this.selectedMission = 'loaded'
      this.resetActiveMission(oldMission)
      this.resetLoadedMission()
      this.fitMapview()
    },
    apis: {
      // Watch apis state for any change and process
      handler: function (newValue) {
        this.createQlQueries()
      }
    },
    selectedMission: {
      handler: function (newValue, oldValue) {
        this.resetActiveMission(oldValue)
        this.fitMapview()
      }
    },
    selectedFeatures (newValue, oldValue) {
      // If a vehicle is selected, change the active API
      if (newValue.length > 0 && newValue[0].id.startsWith('v_')) {
        this.$store.commit('setActiveApi', newValue[0].id.replace('v_', ''))

      // If a waypoint is selected, ...
      } else if (newValue.length > 0 && newValue[0].id.startsWith('w_')) {
        this.logDebug('Waypoint selected')
      }
    },
    vehicleLocation: {
      handler: function (newValue, oldValue) {
        // If mapcenter option set, or vehicleLocation empty, and single api has been chosen, set vehicleLocation from current position
        if (
          (this.mapCenter || (!this.xycenter || this.xycenter.length === 0)) &&
          this.activeApi &&
          !oldValue.every(e => newValue.includes(e)) // is oldValue array different to newValue array?
        ) {
          if (newValue.length !== 0 && this.$refs.mapView.$view) {
            this.xycenter = newValue
            this.fitMapview()
          }
        }
      }
    }
  },

  mounted () {
    this.createQlQueries()
    setTimeout(() => { this.fitMapview() }, 2000) // On first mount, give the map time to setup before fitting extents
  },

  methods: {
    setTickers () {
      this.tickers.navSatFix = true
    },
    createQlQueries () {
      for (const api in this.apis) {
        this.createQuery('NavSatFix', navSatFixQuery, api, 'navSatFixData', !api.state)
        this.createSubscription('NavSatFix', navSatFixSubscription, api, 'navSatFixData', !api.state)
        // this.createQuery('VehicleInfo', vehicleInfoQuery, api, 'vehicleInfoData', !api.state, null, null, { uuid: '' })
        // this.createSubscription('VehicleInfo', vehicleInfoSubscription, api, 'vehicleInfoData', !api.state, null, null, { uuid: '' })
        this.createQuery('MissionList', missionListQuery, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createSubscription('MissionList', missionListSubscription, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createQuery('MissionDatabase', missionDatabaseQuery, api, 'missionDatabaseData', null, null, null, { id: '' })
        this.createSubscription('MissionDatabase', missionDatabaseSubscription, api, 'missionDatabaseData', null, null, null, { id: '' })
      }
    },
    fitMapview () {
      // Fit mapview to show all vehicles, if mapcenter is selected, or on first load
      if (this.mapCenter || !this.viewExtents || this.viewExtents.length === 0) {
        // If the selected mission has waypoints then use those to set the view extents
        if (this.activeApi && this.missionActive[this.activeApi].mission.length > 0) {
          setTimeout(() => { this.setExtents('waypointLayer') }, 1500)

        // Otherwise if selected vehicle, center on the vehicle
        } else if (this.activeApi) {
          this.$refs.mapView.animate({ center: this.xycenter, duration: 500 })

        // Otherwise center on all vehicles
        } else {
          setTimeout(() => { this.setExtents('vehicleLayer') }, 1500)
        }
      }
    },
    setExtents (source) {
      // Fetch extents of the vehicle vectorsource layer
      this.viewExtents = this.$refs[source].$source.getExtent()
      // If there is a finite extent, then fit the view (fits all waypoints within view)
      if (!this.viewExtents.includes(Infinity)) {
        this.$refs.mapView.$view.fit(this.viewExtents, {
          size: this.$refs.map.$map.getSize(),
          duration: 500
        })
      }
    },
    resetActiveMission (oldValue) {
      this.logDebug(`Resetting active mission, removing old mission: ${oldValue}`)
      // We have to destroy and recreate the mission query and subscription, because vue-apollo reactive variables aren't working correctly
      // Remove old query and subscription
      this.$apollo.queries[this.activeApi + '___MissionList___' + oldValue] = null
      this.$apollo.subscriptions[this.activeApi + '___MissionList___' + oldValue] = null
      // Create new query and subscription
      this.createQuery('MissionList', missionListQuery, this.activeApi, 'missionActive', !this.apis[this.activeApi].state, null, null, { id: this.selectedMission })
      this.createSubscription('MissionList', missionListSubscription, this.activeApi, 'missionActive', !this.apis[this.activeApi].state, null, null, { id: this.selectedMission })
      setTimeout(() => { this.logDebug(this.missionActive[this.activeApi]) }, 2000)
    },
    resetLoadedMission () {
      this.logDebug('Resetting loaded mission')
      // We have to destroy and recreate the mission query and subscription, because vue-apollo reactive variables aren't working correctly
      // Remove old query and subscription
      this.$apollo.queries[this.activeApi + '___MissionList___loaded'] = null
      this.$apollo.subscriptions[this.activeApi + '___MissionList___loaded'] = null
      // Create new query and subscription
      this.createQuery('MissionList', missionListQuery, this.activeApi, 'missionLoaded', !this.apis[this.activeApi].state, null, null, { id: 'loaded' })
      this.createSubscription('MissionList', missionListSubscription, this.activeApi, 'missionLoaded', !this.apis[this.activeApi].state, null, null, { id: 'loaded' })
    },
    vehicleIcon (vehicleType) {
      const iconPath = '/img/icons/vehicleIcons/'
      if (vehicleType === 'Copter') {
        return iconPath + 'quadcopter.png'
      } else if (vehicleType === 'Plane') {
        return iconPath + '035-airplane-1.png'
      } else if (vehicleType === 'Sub') {
        return iconPath + '008-submarine-1.png'
      } else if (vehicleType === 'Heli') {
        return iconPath + '060-helicopter.png'
      } else if (vehicleType === 'Rover') {
        return iconPath + '078-car-3.png'
      } else if (vehicleType === 'Boat') {
        return iconPath + '096-boat.png'
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
