const plugin = {
  install (Vue, options) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Installing CoreLog plugin') // eslint-disable-line no-console
    }

    Vue.mixin({
      methods: {
        /* eslint-disable no-console */
        logBanner (message) {
          console.log(
            '%c' + message,
            'background: blue; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;'
          )
        /* eslint-disable no-console */
        },
        logError (message) {
        /* eslint-disable no-console */
          console.error(
            '%cError',
            'background: red; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
            message
          )
        /* eslint-disable no-console */
        },
        logInfo (message) {
        /* eslint-disable no-console */
          console.info(
            '%cInfo',
            'background: blue; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
            message
          )
        /* eslint-disable no-console */
        },
        logDebug (message) {
          if (process.env.NODE_ENV !== 'production') {
            /* eslint-disable no-console */
            console.log(
              '%cDebug',
              'background: purple; color: white; display: block; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
              message
            )
            /* eslint-disable no-console */
          }
        }
      }
    })
  }
}

export const CoreLog = plugin
