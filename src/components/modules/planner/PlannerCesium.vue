<template lang='pug'>
div#cesiumContainer
</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

import { navSatFixQuery, navSatFixSubscription, navSatFixMutate } from '../../../graphql/gql/NavSatFixMessage.gql'

export default {
  data () {
    return {
      viewer: undefined,
      navSatFixMessage: []
    }
  },
  computed: {
    activeApi () { return this.$store.state.activeApi }
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
        selectionIndicator: false,
        timeline: false
      })
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(this.navSatFixMessage.longitude, this.navSatFixMessage.latitude, 1000)
      })
      // this.viewer.terrainProvider = Cesium.createWorldTerrain()
    }
  },

  watch: {
    navSatFixMessage: function (oldSat, newSat) {
      // If the viewer hasn't been constructed yet, do so
      if (!this.viewer && newSat.longitude && newSat.latitude) {
        this.constructViewer()
      }
      // If the position has changed over a minimum threshold, update
      if (
        oldSat !== newSat &&
        (newSat.longitude && newSat.latitude) &&
        (
          ((newSat.longitude - oldSat.longitude > 0.00001) || (newSat.longitude - oldSat.longitude > -0.00001)) ||
          ((newSat.latitude - oldSat.latitude > 0.00001) || (newSat.latitude - oldSat.latitude > -0.00001))
        )
      ) {
        // console.log('Api: ' + this.activeApi + ', Changing camera to ' + newSat.longitude + ':' + newSat.latitude)
        this.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(newSat.longitude, newSat.latitude, 1000)
        })
      }
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
    }
  },

  beforeDestroy: function () {
    Cesium.destroyObject(this.viewer)
  }
}
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
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