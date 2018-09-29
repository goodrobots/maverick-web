<template lang='pug'>
div#cesiumContainer
</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

import { navSatFixQuery, navSatFixSubscription, navSatFixMutate } from '../../../plugins/apollo/graphql/NavSatFixMessage.gql'
import { imuQuery, imuSubscription, imuMutate } from '../../../plugins/apollo/graphql/ImuMessage.gql'
import { vfrHudQuery, vfrHudSubscription, vfrHudMutate } from '../../../plugins/apollo/graphql/VfrHudMessage.gql'

export default {
  data () {
    return {
      viewer: undefined,
      vehicleEntity: undefined,
      navSatFixMessage: [],
      imuMessage: [],
      vfrHudMessage: [],
      posChangeThreshold: 0.00001
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
  },

  watch: {
    navSatFixMessage: function (oldSat, newSat) {
      // If the viewer hasn't been constructed yet and we have a position, construct it
      if (!this.viewer && newSat.longitude && newSat.latitude) {
        this.constructViewer()
      }
      // If the position has changed over a minimum threshold, update
      if (
        oldSat !== newSat &&
        (newSat.longitude && newSat.latitude) &&
        (
          ((newSat.longitude - oldSat.longitude > this.posChangeThreshold) || (newSat.longitude - oldSat.longitude > -this.posChangeThreshold)) ||
          ((newSat.latitude - oldSat.latitude > this.posChangeThreshold) || (newSat.latitude - oldSat.latitude > -this.posChangeThreshold))
        )
      ) {
        // Update the camera to center on the vheicle
        /*
        this.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(newSat.longitude, newSat.latitude, 1000)
        })
        */
        // Update the marker position
        var entity = this.viewer.entities.getById('vehicle')
        entity.position = Cesium.Cartesian3.fromDegrees(newSat.longitude, newSat.latitude, this.vfrHudMessage.altitude)
      }
    }
  },

  beforeDestroy: function () {
    Cesium.destroyObject(this.viewer, 'This viewer has been destroyed')
  },

  methods: {
    constructViewer () {
      Cesium.BingMapsApi.defaultKey = 'Auw42O7s-dxnXl0f0HdmOoIAD3bvbPjFOVKDN9nNKrf1uroCCBxetdPowaQF4XaG'
      // Set the default camera so it doesn't initiall focus on space
      var extent = Cesium.Rectangle.fromDegrees(this.navSatFixMessage.longitude - 0.2, this.navSatFixMessage.latitude - 0.2, this.navSatFixMessage.longitude + 0.2, this.navSatFixMessage.latitude + 0.2)
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent
      Cesium.Camera.DEFAULT_VIEW_FACTOR = 0
      // Construct the cesium view
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        scene3DOnly: true,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false
      })
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(this.navSatFixMessage.longitude, this.navSatFixMessage.latitude, 1000)
      })
      // this.viewer.terrainProvider = Cesium.createWorldTerrain()
      this.constructVehicle()
    },
    constructVehicle () {
      const position = Cesium.Cartesian3.fromDegrees(this.navSatFixMessage.longitude, this.navSatFixMessage.latitude, this.vfrHudMessage.altitude)
      /*
      var heading = 0
      var pitch = 0
      var roll = 0
      var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
      var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)
      const vehicleOffset = new Cesium.Cartesian3(vehicle_offset_x,vehicle_offset_y,vehicle_offset_z)
      */
      this.vehicleEntity = this.viewer.entities.add({
        name: 'Vehicle',
        id: 'vehicle',
        position: position,
        // orientation : orientation,
        box: {
          dimensions: new Cesium.Cartesian3(4.0, 4.0, 4.0),
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
        }
      })
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
      },
      mutation: navSatFixMutate
    },
    imuMessage: {
      query: imuQuery,
      subscribeToMore: {
        document: imuSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            imuMessage: subscriptionData.data.imuMessage
          }
        }
      },
      mutation: imuMutate
    },
    vfrHudMessage: {
      query: vfrHudQuery,
      subscribeToMore: {
        document: vfrHudSubscription,
        updateQuery: (previousResult, { subscriptionData }) => {
          return {
            vfrHudMessage: subscriptionData.data.vfrHudMessage
          }
        }
      },
      mutation: vfrHudMutate
    }
  }

}
</script>

<style>
#cesiumContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left:0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body .cesium-viewer .cesium-widget-credits {
  display: none;
  position: static;
  bottom: auto;
  left: auto;
  padding-right: 0;
  color: #ffffff;
  font-size: 8px;
  text-shadow: none;
  line-height: 10px;
}

.cesium-credit-image img {
  display: none;
  width: 50px;
}
</style>
