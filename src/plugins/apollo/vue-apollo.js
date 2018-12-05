import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createClient } from './apollo-functions'

// Install the vue plugin
Vue.use(VueApollo)

// Http endpoint
// const currentSite = location.hostname + (location.port ? ':' + location.port : '')
/*
const defaultEndpoint = '/web/api/fc'
const httpEndpoint = location.protocol + '//' + currentSite + defaultEndpoint + '/graphql'
const wsEndpoint = ((location.protocol === 'https:') ? 'wss://' : 'ws://') + currentSite + defaultEndpoint + '/subscriptions'
*/

export function createProvider (options = {}) {
  // const fcClient = createClient(defaultOptions)
  const sitlClient1 = createClient({
    // httpEndpoint: location.protocol + '//' + currentSite + '/web/api/sitl/graphql',
    httpEndpoint: 'http://dev.maverick.one:7000/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7000/subscriptions',
    websocketsOnly: false
  })

  const sitlCopter2 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7010/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7010/subscriptions',
    websocketsOnly: false
  })

  const sitlCopter3 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7020/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7020/subscriptions',
    websocketsOnly: false
  })

  /*
  const sitlCopter4 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7030/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7030/subscriptions',
    websocketsOnly: false
  })

  const sitlCopter5 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7040/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7040/subscriptions',
    websocketsOnly: false
  })
  */

  const sitlPlane1 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7060/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7060/subscriptions',
    websocketsOnly: false
  })

  /*
  const sitlPlane2 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7060/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7060/subscriptions',
    websocketsOnly: false
  })
  */

  const sitlRover1 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7080/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7080/subscriptions',
    websocketsOnly: false
  })

  const sitlSub1 = createClient({
    httpEndpoint: 'http://dev.maverick.one:7090/graphql',
    wsEndpoint: 'ws://dev.maverick.one:7090/subscriptions',
    websocketsOnly: false
  })

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    clients: {
      // fc: fcClient,
      sitl1: sitlClient1,
      copter2: sitlCopter2,
      copter3: sitlCopter3,
      plane1: sitlPlane1,
      rover1: sitlRover1,
      sub1: sitlSub1
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      }
    },
    // Global error handler for all smart queries and subscriptions
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    },
    defaultClient: sitlClient1
  })

  return apolloProvider
}
