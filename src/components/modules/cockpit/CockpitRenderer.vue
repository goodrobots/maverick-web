<template lang='pug'>
div.cockpit-hud
  canvas(ref="cockpitWindow")
    slot
</template>

<script>
import Vue from 'vue'
import * as PIXI from 'pixi.js'

export default {
  data () {
    return {
      cockpitWindow: null,
      EventBus: new Vue(),
      CockpitObject: {
        PIXI,
        PixiApp: null
      }
    }
  },

  provide () {
    const provider = {}
    Object.defineProperty(provider, 'EventBus', {
      enumerable: true,
      get: () => this.EventBus
    })
    Object.defineProperty(provider, 'CockpitObject', {
      enumerable: true,
      get: () => this.CockpitObject
    })
    return {
      EventBus: provider.EventBus,
      CockpitObject: provider.CockpitObject
    }
  },

  methods: {
    handleResize () {
      this.CockpitObject.PixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    }
  },

  mounted () {
    this.cockpitWindow = this.$refs.cockpitWindow
    this.CockpitObject.PIXI.utils.skipHello()
    this.CockpitObject.PixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {
      antialias: true,
      transparent: true,
      view: this.cockpitWindow,
      resolution: window.devicePixelRatio || 1,
      autoResize: true
    })
    this.EventBus.$emit('ready') // notify child components that pixi is ready to go
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
    this.CockpitObject.PixiApp.destroy(true)
  }

}
</script>

<style scoped>
* {padding: 0; margin: 0}
.cockpit-hud {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cockpit-hud canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
