<template lang='pug'>
</template>

<script>
import { navSatFixQuery, navSatFixSubscription, navSatFixMutate } from '../../../graphql/gql/NavSatFixMessage.gql'

export default {
  data () {
    return {
      viewer: undefined,
      navSatFixMessage: []
    }
  },
  computed: {
    activeApi () {
      console.log(this.$apollo)
      return this.$store.state.activeApi
    }
  },
  watch: {
    navSatFixMessage: function (oldSat, newSat) {
      if (
        oldSat !== newSat &&
        (newSat.longitude && newSat.latitude) &&
        (
          ((newSat.longitude - oldSat.longitude > 0.00001) || (newSat.longitude - oldSat.longitude > -0.00001)) ||
          ((newSat.latitude - oldSat.latitude > 0.00001) || (newSat.latitude - oldSat.latitude > -0.00001))
        )
      ) {
        // console.log('Changing camera to ' + newSat.longitude + ':' + newSat.latitude)
        /*
        this.viewer.camera.setView({
          destination: Cesium.Cartesian3.fromDegrees(newSat.longitude, newSat.latitude, 1000)
        })
        */
      }
    }
  },
  mounted () {
    /*
    Cesium.BingMapsApi.defaultKey = 'Auw42O7s-dxnXl0f0HdmOoIAD3bvbPjFOVKDN9nNKrf1uroCCBxetdPowaQF4XaG'

    // Construct the viewer, with a high-res terrain source pre-selected.
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false, // Disable time control widget
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      timeline: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      scene3DOnly: true,
      infoBox: false, // Disable InfoBox widget
      selectionIndicator: false, // Disable selection indicator
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: '//assets.agi.com/stk-terrain/world',
        requestVertexNormals: true
      })
    })
    */
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
  created () {
    this.$apollo.addSmartQuery('navSatFixMessage', {
      client: 'devPx4sitl',
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
    })
    this.$apollo.addSmartQuery('navSatFixMessage', {
      client: 'wwwSitl',
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
    })
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
  display: block;
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
    width: 50px;
}
</style>