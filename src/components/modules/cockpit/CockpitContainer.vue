<script>
export default {
  inject: ['EventBus', 'CockpitObject'],

  data () {
    return {
      container: null
    }
  },

  mounted () {
    this.container = new this.CockpitObject.PIXI.Container()
    this.container.interactive = true

    // Forward PIXI's pointerdown event through Vue.
    this.container.on('pointerdown', () =>
      this.$emit('pointerdown', this.container)
    )

    // Once the PIXI app in the renderer component is ready, add this container to its parent.
    this.EventBus.$on('ready', () => {
      if (this.$parent.container) {
        // If the parent is another container, add to it.
        this.$parent.container.addChild(this.container)
      } else {
        // Otherwise it's a direct descendant of the renderer stage.
        this.CockpitObject.PixiApp.stage.addChild(this.container)
      }

      // this.CockpitObject.PixiApp.ticker.add(delta => this.$emit('tick', this.container, delta))
    })
  },

  // At the current time, Vue does not allow empty components to be created without a DOM element if they have children.
  // To work around this, we create a tiny render function that renders to <template><!-- children --></template>.
  render (h) {
    return h('template', this.$slots.default)
  }
}
</script>
