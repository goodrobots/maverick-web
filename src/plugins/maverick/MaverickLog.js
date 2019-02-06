const plugin = {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Installing MaverickLog plugin')
    }

    Vue.mixin({
      methods: {
        logBanner (message) {
          console.log(
            '%c' + message,
            'background: blue; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;'
          )
        },
        logError (message) {
          console.error(
            '%cError',
            'background: red; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
            message
          )
        },
        logInfo (message) {
          console.info(
            '%cInfo',
            'background: blue; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
            message
          )
        },
        logDebug (message) {
          if (process.env.NODE_ENV !== 'production') {
            console.log(
              '%cDebug',
              'background: purple; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
              message
            )
          }
        }
      }
    })
  }
}

export const MaverickLog = plugin
