// const mavlinkEnums = import('./mavlinkEnumData.json')

const plugin = {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Installing MavlinkMeta plugin') // eslint-disable-line no-console
    }

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
        },
        mavlinkGroup (enumGroup) {
          if (enumGroup in mavlinkEnums) {
            return mavlinkEnums[enumGroup]
          } else {
            return null
          }
        }
      }
    })
  }
}

export const MavlinkMeta = plugin
