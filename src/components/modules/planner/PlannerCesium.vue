<template>
  <div id="cesium_container"></div>
</template>

<script>
import Cesium from 'cesium/Cesium'
require('cesium/Widgets/widgets.css')

export default {
  data () {
    return {
      viewer: undefined
    }
  },

  created () {
    // some crappy demo stuff...
    console.log('mavcesium created')
  },

  mounted () {
    // we can only create the viewer once the DOM has been modified
    // some crappy code to setup the cesium viewer
    // Construct the viewer, with a high-res terrain source pre-selected.
    this.viewer = new Cesium.Viewer('cesium_container')
    // position the camera roughly over Australia
    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(134.67, -26.00, 5000000)
    })
  }
}
</script>

<style scoped>
#cesium_container {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
</style>
