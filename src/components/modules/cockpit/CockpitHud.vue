<script>
import { imuQuery, imuSubscription } from '../../../graphql/gql/ImuMessage.gql'
import colors from 'vuetify/es5/util/colors'
import { colorToInt } from 'vuetify/es5/util/colorUtils'

export default {
  inject: ['EventBus', 'CockpitObject'],

  data () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      rollRotation: 0,
      numTicks: 6,
      tickRadius: 8,
      triangleSize: 8,
      rollLineWidth: 1,
      topOffset: 70,
      topTriangle: new this.CockpitObject.PIXI.Graphics(),
      rollArc: new this.CockpitObject.PIXI.Graphics(),
      rotatingBackground: new this.CockpitObject.PIXI.Graphics(),
      fixedBackground: new this.CockpitObject.PIXI.Graphics(),
      fixedTriangle: new this.CockpitObject.PIXI.Graphics(),
      fixedHorizonMarkings: new this.CockpitObject.PIXI.Graphics(),
      pitchContainer: new this.CockpitObject.PIXI.Graphics(),
      pitchHorizon: new this.CockpitObject.PIXI.Graphics(),
      horizonMarkings: new this.CockpitObject.PIXI.Graphics(),
      filledHorizon: true,
      pitchNumbers: {},
      ladderSteps: 6,
      ladderWidth: 50,
      imuMessage: [],
      tickers: {
        'imuMessage': false,
        'drawHud': false
      }
    }
  },

  render () {},

  // Use timers to set intervals for each message so we can limit the update frequency in the client
  timers: {
    setTickers: { time: 200, autostart: true, repeat: true }
  },

  computed: {
    activeApi () { return this.$store.state.activeApi },
    dimensions () {
      return {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      }
    },
    tickTop () {
      return ((Math.PI * 2) / 4) * 3
    },
    tickStep () {
      return 1 / this.numTicks
    },
    // Predefine graphic objects for roll ticks
    rollTicks () {
      let ticks = {}
      for (let direction of [true, false]) {
        for (let counter = 0; counter < 1; counter += this.tickStep) {
          const tick = (direction) ? this.tickTop + counter : this.tickTop - counter
          ticks[tick] = new this.CockpitObject.PIXI.Graphics()
        }
      }
      return ticks
    },
    // Predefine graphic objects for pitch ladder
    pitchLadder () {
      let lines = {}
      for (let direction of [true, false]) {
        for (let counter = 0; counter < this.ladderSteps * 3; counter += 1) {
          const counterindex = (direction) ? counter : -counter
          lines[counterindex] = new this.CockpitObject.PIXI.Graphics()
          this.pitchNumbers[counterindex] = new this.CockpitObject.PIXI.Text()
        }
      }
      return lines
    },
    // Convert quaternion orientation to euler angles
    eulerRpy () {
      const rpy = {}
      rpy.roll = -Math.atan2(2.0 * (this.imuMessage.orientationZ * this.imuMessage.orientationY + this.imuMessage.orientationW * this.imuMessage.orientationX), 1.0 - 2.0 * (this.imuMessage.orientationX * this.imuMessage.orientationX + this.imuMessage.orientationY * this.imuMessage.orientationY))
      rpy.pitch = -Math.asin(2.0 * (this.imuMessage.orientationY * this.imuMessage.orientationW - this.imuMessage.orientationZ * this.imuMessage.orientationX))
      rpy.yaw = -Math.atan2(2.0 * (this.imuMessage.orientationZ * this.imuMessage.orientationW + this.imuMessage.orientationX * this.imuMessage.orientationY), -1.0 + 2.0 * (this.imuMessage.orientationW * this.imuMessage.orientationW + this.imuMessage.orientationX * this.imuMessage.orientationX))
      return rpy
    }
  },

  // Setup grqphql imu message stream
  apollo: {
    $client () { return this.activeApi },
    imuMessage: imuQuery,
    $subscribe: {
      imuMessage: {
        query: imuSubscription,
        result ({ data }) {
          if (this.imuMessage !== data.imuMessage && this.tickers['imuMessage']) {
            this.imuMessage = data.imuMessage
            this.tickers['imuMessage'] = false // Turn the ticker off until the next interval
          }
        }
      }
    }
  },

  methods: {
    setTickers () {
      this.tickers['imuMessage'] = true
      this.tickers['drawHud'] = true
      this.tickerUpdate()
    },
    handleResize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.tickerUpdate()
    },
    drawFixedBackground () {
      this.fixedBackground.clear()
      this.fixedBackground.beginFill(0x000000, 0)
      this.fixedBackground.lineStyle(0, 0x111111, 1)
      this.fixedBackground.drawRect(
        this.dimensions.x,
        this.dimensions.y,
        this.dimensions.width,
        this.dimensions.width
      )
      this.fixedBackground.endFill()
    },
    drawRotatingBackground () {
      this.rotatingBackground.clear()
      // Reset the container position and pivot point to rotate around the center
      this.rotatingBackground.pivot.x = this.dimensions.width / 2
      this.rotatingBackground.pivot.y = this.dimensions.height / 2
      this.rotatingBackground.position.x = this.dimensions.width / 2
      this.rotatingBackground.position.y = this.dimensions.height / 2
    },
    drawFixedTriangle () {
      const innerLength = this.dimensions.height / 2 - this.topOffset - (this.tickRadius * 2)
      let innerx = (this.dimensions.width / 2) + (innerLength * Math.cos(this.tickTop))
      let innery = (this.dimensions.height / 2) + (innerLength * Math.sin(this.tickTop))
      this.fixedTriangle.clear()
      this.fixedTriangle.beginFill(colorToInt(colors.yellow.darken1), 1)
      this.fixedTriangle.lineStyle(this.rollLineWidth, colorToInt(colors.shades.white), 1)
      this.fixedTriangle.moveTo(innerx, innery + 1)
      this.fixedTriangle.lineTo(innerx + this.triangleSize, innery + (this.triangleSize * 2))
      this.fixedTriangle.lineTo(innerx - this.triangleSize, innery + (this.triangleSize * 2))
      this.fixedTriangle.lineTo(innerx, innery + 1)
      this.fixedTriangle.endFill()
      this.fixedBackground.addChild(this.fixedTriangle)
    },
    drawFixedHorizonMarkings () {
      this.fixedHorizonMarkings.clear()
      this.fixedHorizonMarkings.lineStyle(this.rollLineWidth * 4, colorToInt(colors.yellow.darken1), 1)
      // Draw the horizontal lines left and right from center
      this.fixedHorizonMarkings.moveTo((this.width / 2) - (this.ladderWidth * 4.5), this.height / 2)
      this.fixedHorizonMarkings.lineTo((this.width / 2) - (this.ladderWidth * 2.5), this.height / 2)
      this.fixedHorizonMarkings.moveTo((this.width / 2) + (this.ladderWidth * 4.5), this.height / 2)
      this.fixedHorizonMarkings.lineTo((this.width / 2) + (this.ladderWidth * 2.5), this.height / 2)
      // Draw the arrow at center
      this.fixedHorizonMarkings.moveTo(this.width / 2 - this.ladderWidth, this.height / 2 + 30)
      this.fixedHorizonMarkings.lineTo(this.width / 2, this.height / 2)
      this.fixedHorizonMarkings.lineTo(this.width / 2 + this.ladderWidth, this.height / 2 + 30)
      this.fixedBackground.addChild(this.fixedHorizonMarkings)
    },
    drawRollTicks () {
      const innerLength = this.dimensions.height / 2 - this.topOffset - (this.tickRadius * 2)
      // Draw the roll arc that runs underneath all the ticks
      this.rollArc.clear()
      this.rollArc.lineStyle(2, colorToInt(colors.shades.white), 1)
      this.rollArc.arc(this.dimensions.width / 2, this.dimensions.height / 2, innerLength, this.tickTop - 1, this.tickTop + 1, false)
      this.rotatingBackground.addChild(this.rollArc)
      // Start at the top and draw to the left, then start at the top again and draw to the right
      // This is to ensure we always have the central tick/triangle at the top regardless of number and spacing of ticks
      for (let direction of [true, false]) {
        let tickBool = false
        for (let counter = 0; counter < 1; counter += this.tickStep) {
          const tick = (direction) ? this.tickTop + counter : this.tickTop - counter
          const tickMultiplier = (tickBool) ? 2 : 1
          const outerLength = this.dimensions.height / 2 - this.topOffset + this.tickRadius - (this.tickRadius * tickMultiplier)
          let outerx = (this.dimensions.width / 2) + (outerLength * Math.cos(tick))
          let outery = (this.dimensions.height / 2) + (outerLength * Math.sin(tick))
          let innerx = (this.dimensions.width / 2) + (innerLength * Math.cos(tick))
          let innery = (this.dimensions.height / 2) + (innerLength * Math.sin(tick))
          if (!counter) {
          // If we're still at the top, draw a nice triangle instead
            this.topTriangle.clear()
            this.topTriangle.beginFill(0xffffff, 1)
            this.topTriangle.lineStyle(this.rollLineWidth, 0xffffff, 1)
            this.topTriangle.moveTo(innerx, innery)
            this.topTriangle.lineTo(innerx + this.triangleSize, innery - (this.triangleSize * 2))
            this.topTriangle.lineTo(innerx - this.triangleSize, innery - (this.triangleSize * 2))
            this.topTriangle.lineTo(innerx, innery)
            this.topTriangle.endFill()
            this.rotatingBackground.addChild(this.topTriangle)
          // Otherwise, draw a tick
          } else {
            this.rollTicks[tick].clear()
            this.rollTicks[tick].lineStyle(2, 0xeeeeee, 1)
            this.rollTicks[tick].moveTo(innerx, innery)
            this.rollTicks[tick].lineTo(outerx, outery)
            this.rotatingBackground.addChild(this.rollTicks[tick])
          }
          tickBool = !tickBool
        }
      }
    },
    drawPitchHorizon () {
      this.pitchHorizon.clear()
      // Draw horizon line
      this.pitchHorizon.lineStyle(this.rollLineWidth, 0xffffff, 1)
      this.pitchHorizon.moveTo(0, this.height / 2)
      this.pitchHorizon.lineTo(this.width, this.height / 2)
      if (this.filledHorizon) {
        // Draw sky
        this.pitchHorizon.beginFill(0xaaaaff, 0.5)
        this.pitchHorizon.drawRect(
          this.dimensions.x - this.dimensions.width / 2,
          this.dimensions.y - this.dimensions.height / 2,
          this.dimensions.width + this.dimensions.width,
          this.dimensions.height + this.dimensions.height
        )
        this.pitchHorizon.endFill()
        // Draw ground
        this.pitchHorizon.beginFill(0xaaffaa, 0.5)
        this.pitchHorizon.drawRect(
          this.dimensions.x - this.dimensions.width / 2,
          this.dimensions.height / 2,
          this.dimensions.width + this.dimensions.width,
          this.dimensions.height
        )
        this.pitchHorizon.endFill()
      }
      this.pitchContainer.addChild(this.pitchHorizon)
    },
    drawPitchLadder () {
      // Draw the horizon line ladder markings
      // Draw the ladder lines
      for (let direction of [true, false]) {
        let lineBool = false
        for (let counter = 0; counter < this.ladderSteps * 3; counter += 1) {
          const counterindex = (direction) ? counter : -counter
          const absline = (((this.height / 2) - this.topOffset * 2) / this.ladderSteps) * counter
          const line = (direction) ? absline : -absline
          const lineMultiplier = (lineBool) ? 1 : 2
          const lineColor = (lineBool) ? 0xffffff : 0xeeeeee
          this.pitchLadder[counterindex].clear()
          // If the ladder line is within smaller y-axis boundary, add it to the ladder container and display it
          if (
            (this.height / 2 - line > this.topOffset + 20 + Math.abs(this.eulerRpy.pitch * 1000)) &&
            (this.height / 2 - line < this.height - this.topOffset - 20 + Math.abs(this.eulerRpy.pitch * 1000))
          ) {
            this.pitchLadder[counterindex].lineStyle(this.rollLineWidth * lineMultiplier, lineColor, 1)
            this.pitchLadder[counterindex].moveTo(this.width / 2 - ((this.ladderWidth / 2) * lineMultiplier), this.height / 2 - line)
            this.pitchLadder[counterindex].lineTo(this.width / 2 + ((this.ladderWidth / 2) * lineMultiplier), this.height / 2 - line)
            if (!lineBool && counter) {
              this.pitchNumbers[counterindex].text = counterindex * 5
              this.pitchNumbers[counterindex].style = {fontSize: 18, fill: 0xffffff}
              this.pitchNumbers[counterindex].x = this.width / 2 - this.ladderWidth - 30
              this.pitchNumbers[counterindex].y = this.height / 2 - line - 10
              // let text = new this.CockpitObject.PIXI.Text(counterindex * 5, {fontSize: 18, fill: 0xffffff})
              this.pitchLadder[counterindex].addChild(this.pitchNumbers[counterindex])
            }
          }
          this.pitchContainer.addChild(this.pitchLadder[counterindex])
          lineBool = !lineBool
        }
      }
    },
    tickerUpdate () {
      if (this.tickers['drawHud'] && this.addState) {
        // Draw the rotating layer
        this.drawRotatingBackground()
        this.drawPitchHorizon()
        this.drawPitchLadder()
        // Transform the pitch container in y axis according to pitch attitude, within rotating layer
        this.pitchContainer.position.y = this.eulerRpy.pitch * 1000
        this.drawRollTicks()
        // Draw the fixed layer
        this.drawFixedBackground()
        this.drawFixedTriangle()
        this.drawFixedHorizonMarkings()
        // Rotate the rotating layer according to roll attitude
        this.rotatingBackground.rotation = this.eulerRpy.roll
        // Turn off the ticker until the next interval
        this.tickers['drawHud'] = false
      }
    }
  },

  mounted () {
    this.addState = false
    this.EventBus.$on('ready', () => {
      // Setup layered graphics containers
      if (this.$parent.container) {
        this.$parent.container.addChild(this.rotatingBackground)
        this.$parent.container.addChild(this.fixedBackground)
      } else {
        this.CockpitObject.PixiApp.stage.addChild(this.rotatingBackground)
        this.CockpitObject.PixiApp.stage.addChild(this.fixedBackground)
      }
      this.$parent.container.x = this.dimensions.x
      this.$parent.container.y = this.dimensions.y
      this.$parent.container.width = this.dimensions.width
      this.$parent.container.height = this.dimensions.height
      this.rotatingBackground.addChild(this.pitchContainer)
      this.handleResize()
      if (!this.addState) {
        this.addState = true
        /*
        this.CockpitObject.PixiApp.ticker.add(() => {
          this.tickerUpdate()
        })
        */
      }
    })
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
