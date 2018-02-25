<template lang='pug'>
div#cesiumContainer
</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

export default {
  data () {
    return {
      viewer: undefined
    }
  },
  created () {
  },
  mounted () {
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
    // position the camera roughly over Australia
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(134.67, -26.00, 5000000)
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
