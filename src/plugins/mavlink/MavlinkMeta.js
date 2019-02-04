import mavlinkEnums from './mavlinkEnumData.json'

const plugin = {
  install (Vue, options) {
    console.log('Installing MavlinkMeta plugin')

    Vue.mixin({
      data () {
        return {
        }
      },

      methods: {
        mavlinkEnum (enumGroup, enumKey) {
          // Return command text if available
          if (enumGroup in mavlinkEnums) {
            if (enumKey in mavlinkEnums[enumGroup]) {
              return mavlinkEnums[enumGroup][enumKey]
            }
          } else {
            return enumKey
          }
        }
      }
    })
  }
}

export const MavlinkMeta = plugin
