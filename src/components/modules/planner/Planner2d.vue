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
    vl-interaction-select(:features.sync="selectedFeatures" v-if="waypointMode == 'select'")
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
                div Hello this is a test
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
    vl-layer-vector
      vl-source-vector(ref="vehicleLayer")
        vl-feature(:id="'v_' + api" v-for="(data, api) in navSatFixData" :key="'v_' + api")
          vl-geom-point(v-if="data && 'longitude' in data" :coordinates="[data.longitude, data.latitude]")
          vl-style-box
            vl-style-icon(v-if="apis[api] && vfrHudData[api]" :src="publicPath + apis[api].icon" :anchor="[0.5, 1]" :scale="api == activeApi ? 1 : 0.75" :opacity="api == activeApi ? 1 : 0.75" :rotation="vfrHudData[api].heading * (Math.PI/180)")
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
      vl-layer-vector
        vl-source-vector(ref="waypointLayer" ident="waypoint-draw-target" :features.sync="waypointFeatures")
      // vl-layer-vector
        vl-source-vector(ref="waypointLayer" ident="waypoint-draw-target" :features.sync="waypointFeatures")
          vl-feature(v-if="missionActive[activeApi]" v-for="(waypoint, index) in missionActive[activeApi].mission" :id="'w_' + index" :key="'w_' + index")
            vl-geom-point(v-if="waypoint.longitude && waypoint.latitude" :coordinates="[waypoint.longitude, waypoint.latitude]")
            vl-style-box
              vl-style-circle(:radius=11)
                vl-style-fill(:color="apis[activeApi]['colorLight']")
                vl-style-stroke(:color="apis[activeApi]['colorDark']" :width=2)
          // Add lines to join the markers
          // vl-feature(v-if="missionActive[activeApi]")
            vl-geom-line-string(v-if="missionActive[activeApi].mission.length > 0" :coordinates="missionActive[activeApi].mission.map(x => [x.longitude, x.latitude]).filter(x => x[0] && x[1])")
            vl-style-box
              vl-style-stroke(:color="apis[activeApi]['colorDark']")
              vl-style-fill(:color="apis[activeApi]['colorDark']")
          // Add numbers for mission waypoint marker
          // vl-feature(v-if="missionActive[activeApi]" v-for="(waypoint, index) in missionActive[activeApi].mission" :key="'wm_' + index")
            vl-overlay(v-if="waypoint.longitude && waypoint.latitude" :position="[waypoint.longitude, waypoint.latitude]")
              span.markernumber.caption(v-html="index")
      vl-interaction-draw(v-if="waypointMode == 'draw'" source="waypoint-draw-target" :type="waypointDrawMode")
      vl-interaction-modify(v-if="waypointMode == 'modify'" source="waypoint-draw-target")
      vl-interaction-snap(source="waypoint-draw-target" :priority="10")

  // Display mapview menu
  div.mapmenu
    v-menu(offset-x :close-on-content-click="false" :nudge-width="200" :nudge-right="5" v-model="mapmenu")
      v-btn(:color="navColor" slot="activator") Map Options
      v-card
        v-list
          v-list-tile
            v-list-tile-title Menu Options
        v-divider
        v-list
          v-list-tile
            v-list-tile-title Vehicle Info
            v-list-tile-action
              v-switch(v-model="mapVehicleInfo" color="primary")
          v-list-tile
            v-list-tile-title Auto Center
            v-list-tile-action
              v-switch(v-model="mapCenter" color="primary")
          v-list-tile
            v-list-tile-title Map Zoom
            v-list-tile-action
              v-slider(v-model="mapZoom" :min="1" :max="21" :step="1" thumb-label)
          v-list-tile
            v-list-tile-title Map Source
            v-list-tile-action
              v-select(:items="maplayers" v-model="mapLayer")
        v-card-actions
          v-btn(color="primary" outline small @click="centerVehicle()") Center Vehicle
          v-btn(v-if="activeApi" color="primary" outline small @click="centerWaypoints()") Fit Waypoints

  // If api chosen, display a mission database menu
  div.missionmenu(v-if="activeApi")
    v-menu(offset-y v-model="missionmenu")
      v-btn(:color="navColor" slot="activator") Mission Database
      v-list(two-line)
        v-list-tile(@click="selectedMission='loaded'")
          v-list-tile-content
            v-list-tile-title Loaded Mission
            v-list-tile-sub-title Waypoints: <strong>{{ (missionLoaded[activeApi]) ? missionLoaded[activeApi].total : '---' }}</strong>
      v-divider(inset)
      v-list(v-if="missionDatabaseData[activeApi]" two-line subheader)
        v-subheader Database Missions
        v-list-tile(v-if="'missions' in missionDatabaseData[activeApi]" v-for="(mission, ix) in missionDatabaseData[activeApi].missions" :key="`mdb_${ix}`" @click="selectedMission=mission.id")
          v-list-tile-content
            v-list-tile-title {{ (mission.name) ? mission.name : mission.id }}
            v-list-tile-sub-title Waypoints: {{ mission.total }}

  // If api chosen, display a mission list
  div.missionlist.scroll-y(v-if="activeApi && missionActive[activeApi]")
    v-list(subheader two-line dense)
      v-subheader Mission Summary
      v-list-tile
        v-list-tile-content
          v-list-tile-title {{ (missionActive[activeApi].name) ? missionActive[activeApi].name : missionActive[activeApi].id }}
          v-list-tile-sub-title Waypoints: <strong>{{ missionActive[activeApi].total }}</strong>
    v-divider
    v-list(subheader dense)
      v-subheader Mission Waypoints
      v-list-group(v-if="missionActive[activeApi]" v-for="(waypoint, ix) in missionActive[activeApi].mission" v-model="waypointActive[waypoint.seq]" :key="`waypoint_${ix}`")
        v-list-tile(slot="activator")
          v-list-tile-content
            v-list-tile-title {{ waypoint.seq }}: <strong>{{ mavlinkEnum('MAV_CMD', waypoint.command).name.replace("NAV_", "") }}</strong>
        v-card(color='rgba(99, 99, 99, 0.1)')
          v-card-text
            v-layout(row wrap)
              v-flex(xs12)
                v-btn(@click.stop="deleteDialog = true" color="red" small outline) Delete
                div {{ mavlinkEnum('MAV_CMD', waypoint.command).description }}
                // Waypoint Type: NAV_WAYPOINT
                template(v-if="waypoint.command == '16'")
                  div Hold Time: <strong>{{ waypoint.param1 }}</strong>
                  div Hit Radius: <strong>{{ waypoint.param2 }}</strong>
                  div Param3?: <strong>{{ waypoint.param3 }}</strong>
                  div Yaw Angle: <strong>{{ waypoint.param4 }}</strong>
                  div Latitude: <strong>{{ _.round(waypoint.latitude, 2) }}</strong>
                  div Longitude: <strong>{{ _.round(waypoint.longitude, 2) }}</strong>
                  div Altitude: <strong>{{ _.round(waypoint.altitude, 2) }}</strong>
                template(v-else-if="waypoint.command == '12'")
                  div
                template(v-else)
                  div {{ waypoint.command }}

    v-divider
    v-list(subheader dense)
      v-subheader Waypoints Mode
      v-list-tile
        v-list-tile-content
          v-card
            v-card-text
              v-layout(row wrap)
                v-flex(xs12)
                  v-radio-group(v-model="waypointMode" row)
                    v-radio(label="Select" value="select")
                    v-radio(label="Modify" value="modify")
                    v-radio(label="Add" value="draw")

  v-dialog(v-if="activeWaypoint" v-model="deleteDialog" max-width="290" hide-overlay=true)
    v-card
      v-card-title
        span.headline.red--text Delete Waypoint: <strong>{{ activeWaypoint.seq }}</strong>?
        h3 ({{ mavlinkEnum('MAV_CMD', activeWaypoint.command).description }})
      v-card-text
        div Are you sure you want to delete this mission waypoint?  This action is irreversible!
      v-card-actions
        v-spacer
        v-btn(flat @click="deleteDialog = false") Cancel
        v-btn(flat color="red darken-1" @click="deleteWaypoint(activeWaypoint.seq); deleteDialog = false") Delete
</template>

<script>
import { navSatFixQuery, navSatFixSubscription } from '../../../plugins/graphql/gql/NavSatFix.gql'
import { vfrHudQuery, vfrHudSubscription } from '../../../plugins/graphql/gql/VfrHud.gql'
import { missionListQuery, missionListSubscription, missionListMutate } from '../../../plugins/graphql/gql/MissionList.gql'
import { missionDatabaseQuery, missionDatabaseSubscription } from '../../../plugins/graphql/gql/MissionDatabase.gql'

import { findPointOnSurface } from 'vuelayers/lib/ol-ext'

export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,

      fav: true,
      menu: false,
      message: false,
      hints: true,

      vfrHudData: {},
      navSatFixData: {},
      missionActive: {},
      missionLoaded: {},
      missionDatabaseData: {},
      selectedMission: 'loaded',
      viewExtents: null,
      selectedFeatures: [],
      deleteDialog: false,

      waypointMode: 'select',
      waypointDrawMode: 'point',
      waypointFeatures: [],
      waypointActive: [],
      selectedWaypoint: null,
      activeWaypoint: null,

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
          this._.round(this.navSatFixData[this.activeApi].longitude, 5),
          this._.round(this.navSatFixData[this.activeApi].latitude, 5)
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
    missionActive: {
      handler: function (newValue, oldValue) {
        this.logDebug('missionActive changed')
        this._.delay(this.syncWaypoints, 1000)
      },
      deep: true
    },
    selectedFeatures (newValue, oldValue) {
      // If a vehicle is selected, change the active API
      if (newValue.length > 0 && newValue[0].id && newValue[0].id.startsWith('v_')) {
        this.$store.commit('setActiveApi', newValue[0].id.replace('v_', ''))

      // If a waypoint is selected, ...
      } else if (newValue.length === 1 && newValue[0].id && newValue[0].id.startsWith('w_')) {
        this.selectedWaypoint = newValue[0].id.replace('w_', '')
        this.waypointActive[this.selectedWaypoint] = true
        this.activeWaypoint = this.missionActive[this.activeApi].mission[this.selectedWaypoint]

      // Otherwise..
      } else {
        // Unselect all waypoints
        for (let wp in this.waypointActive) {
          this.waypointActive[wp] = false
        }
      }
    },
    selectedMission: {
      handler: function (newValue, oldValue) {
        this.resetActiveMission(oldValue)
        this.fitMapview()
      }
    },
    waypointFeatures: {
      handler: function (newValue, oldValue) {
        // If there is a changed waypoint, try to mutate the coordinates back to the api
        const changed = this._.differenceWith(newValue, oldValue, this._.isEqual).filter(feature => feature.id !== 'wayLines')

        // If we have a new waypoint, construct feature object and add
        if (oldValue.length > 0 && newValue.length > oldValue.length) {
          if (!changed[0].id.startsWith('w_') && !changed[0].id.startsWith('v_')) {
            this.logDebug(`New waypoint added, was ${oldValue.length}, now ${newValue.length}, saving mission`)
            // Add a waypoint object into missionActive
            this.missionActive[this.activeApi].mission.push({
              seq: newValue.length,
              isCurrent: false,
              autocontinue: true,
              frame: 3,
              command: 16,
              param1: 0,
              param2: 0,
              param3: 0,
              param4: 0,
              latitude: changed[0].geometry.coordinates[1],
              longitude: changed[0].geometry.coordinates[0],
              altitude: 50
            })
            this.saveMission(this.missionActive[this.activeApi].mission)
          }

        // Else if we have a changed waypoint, commit it
        } else if (changed) {
          if (changed.length === 1 && changed[0].id.startsWith('w_')) {
            const waypoint = this._.toInteger(changed[0].id.replace('w_', ''))
            this.logDebug(`Waypoint ${waypoint} changed, saving mission`)
            // Update the waypoint coordinates into missionActive
            for (const _mwaypoint of this.missionActive[this.activeApi].mission) {
              if (_mwaypoint.seq === waypoint) {
                _mwaypoint.longitude = changed[0].geometry.coordinates[0]
                _mwaypoint.latitude = changed[0].geometry.coordinates[1]
              }
              delete _mwaypoint.__typename
            }
            this.saveMission(this.missionActive[this.activeApi].mission)
          }
        }
      }
    }
  },

  mounted () {
    this.createQlQueries()
    setTimeout(() => { this.fitMapview() }, 1500) // On first mount, give the map time to setup before fitting extents
  },

  methods: {
    centerVehicle () {
      // If a vehicle is active center on that vehicle
      if (this.activeApi) {
        this.$refs.mapView.animate({ center: this.vehicleLocation, duration: 500 })

      // Else fit all vehicles to screen
      } else {
        this.setExtents('vehicleLayer')
      }
    },
    centerWaypoints () {
      if (this.activeApi && this.$refs.waypointLayer) {
        this.setExtents('waypointLayer')
      }
    },
    createQlQueries () {
      for (const api in this.apis) {
        this.createQuery('NavSatFix', navSatFixQuery, api, 'navSatFixData', !api.state)
        this.createSubscription('NavSatFix', navSatFixSubscription, api, 'navSatFixData', !api.state)
        this.createQuery('VfrHud', vfrHudQuery, api, 'vfrHudData', !api.state)
        this.createSubscription('VfrHud', vfrHudSubscription, api, 'vfrHudData', !api.state)
        this.createQuery('MissionList', missionListQuery, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createSubscription('MissionList', missionListSubscription, api, 'missionActive', !api.state, null, null, { id: this.selectedMission })
        this.createQuery('MissionDatabase', missionDatabaseQuery, api, 'missionDatabaseData', null, null, null, { id: '' })
        this.createSubscription('MissionDatabase', missionDatabaseSubscription, api, 'missionDatabaseData', null, null, null, { id: '' })
      }
    },
    deleteWaypoint (seq) {
      this.logDebug(`deleteWaypoint: ${seq}`)
      this.missionActive[this.activeApi].mission = this._.orderBy(this.missionActive[this.activeApi].mission)
      let waypointFound = false
      for (const waypoint in this.missionActive[this.activeApi].mission) {
        // If we've already deleted the waypoint, decrement all future seq numbers
        if (waypointFound) {
          this.missionActive[this.activeApi].mission[waypoint].seq -= 1
        }
        // Delete the waypoint
        if (seq === this.missionActive[this.activeApi].mission[waypoint].seq) {
          this.logDebug(waypoint)
          waypointFound = true
          this.missionActive[this.activeApi].mission.splice(waypoint, 1)
        }
      }
      this.saveMission(this.missionActive[this.activeApi].mission)
    },
    fitMapview () {
      // Fit mapview to show all vehicles, if mapcenter is selected, or on first load
      if (this.mapCenter || !this.viewExtents || this.viewExtents.length === 0) {
        // If the selected mission has waypoints then use those to set the view extents
        if (this.activeApi && this.missionActive[this.activeApi].mission.length > 0) {
          setTimeout(() => { this.centerWaypoints() }, 1500)

        // Otherwise if selected vehicle, center on the vehicle
        } else if (this.activeApi) {
          this.centerVehicle()

        // Otherwise center on all vehicles
        } else {
          setTimeout(() => { this.centerVehicle() }, 1500)
        }
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
      this._.delay(this.syncWaypoints, 1000)
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
    saveMission (data) {
      // Delete __typename from all waypoints
      for (let waypoint of data) {
        delete waypoint.__typename
      }
      // Mutate mission
      this.mutateQuery(this.activeApi, missionListMutate, {
        id: this.selectedMission,
        mission: data
      })
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
    setTickers () {
      this.tickers.navSatFix = true
    },
    syncWaypoints () {
      if (this.missionActive[this.activeApi] && this.$refs.waypointLayer) {
        const mission = this.missionActive[this.activeApi].mission

        // First clear all existing features from the waypoint layer
        this.$refs.waypointLayer.clearFeatures()
        // Add waypoint features
        let waypoints = mission
          .filter(waypoint => waypoint.latitude && waypoint.longitude)
          .map(waypoint => ({
            geometry: {
              type: 'Point',
              coordinates: [waypoint.longitude, waypoint.latitude]
            },
            type: 'Feature',
            id: 'w_' + waypoint.seq
          }))
        this.$refs.waypointLayer.addFeatures(waypoints)

        // Draw lines between waypoints
        let waylines = mission
          .filter(waypoint => waypoint.latitude && waypoint.longitude)
          .map(waypoint => [waypoint.longitude, waypoint.latitude])
        let waylinesFeature = {
          geometry: {
            type: 'LineString',
            coordinates: waylines
          },
          type: 'Feature',
          id: 'wayLines'
        }
        this.$refs.waypointLayer.addFeature(waylinesFeature)

        // Wait for layer to be drawn then fit waypoints to view
        this._.delay(this.fitMapview, 1000)
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

.v-list__group--active {
  background-color: rgba(99, 99, 99, 0.25)
}
</style>
