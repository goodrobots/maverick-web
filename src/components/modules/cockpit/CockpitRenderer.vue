<template lang='pug'>
div
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
      this.app.renderer.resize(window.innerWidth, window.innerHeight)
      this.EventBus.$emit('ready') // notify child components that pixi components need re-rendering
    }
  },

  mounted () {
    this.cockpitWindow = this.$refs.cockpitWindow
    this.CockpitObject.PIXI.utils.skipHello()
    this.CockpitObject.PixiApp = new PIXI.Application(window.innerWidth, window.innerHeight, {
      antialias: true,
      transparent: true,
      resolution: 1,
      view: this.cockpitWindow
    })
    this.app = this.CockpitObject.PixiApp
    this.app.renderer.view.style.position = 'absolute'
    this.app.renderer.view.style.display = 'block'
    this.app.renderer.autoResize = true
    this.app.renderer.resize(window.innerWidth, window.innerHeight)

    this.EventBus.$emit('ready') // notify child components that pixi is ready to go
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }

}
</script>

<style scoped>
* {padding: 0; margin: 0}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>