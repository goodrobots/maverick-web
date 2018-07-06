import Vue from 'vue'
import VueApollo from 'vue-apollo'
// // import createApolloClient from './apollo'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

const currentSite = location.hostname+(location.port ? ':'+location.port: '')
const defaultEndpoint = '/web/api/fc/graphql'

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || location.protocol + '//' + currentSite + defaultEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions]
  console.log('protocol: ' + location.protocol)
  wsEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || ((location.protocol == 'https') ? 'wss://' : 'ws://') + currentSite + defaultEndpoint,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: true,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,
  // Override default http link
  // link: myLink,
  // Override default cache
  // cache: myCache,
  // Additional ApolloClient options
  // apollo: { ... }
}


// Call this in the Vue app file
export function createProvider (options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  return apolloProvider
}

// Manually call this when user log in
export function onLogin (apolloClient, token) {
  localStorage.setItem(AUTH_TOKEN, token)
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
}

// Manually call this when user log out
export function onLogout (apolloClient) {
  localStorage.removeItem(AUTH_TOKEN)
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  apolloClient.resetStore()
}


// Create apollo clients
/*
export const localClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//' + location.hostname + ':' + location.port + '/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
*/

/*
export const devSitlClient = createApolloClient({
  ssr: false,
  base: location.protocol + '//dev.maverick.one/web/api/sitl',
  endpoints: {
    graphql: '/graphql',
    subscription: '/subscriptions'
  },
  persisting: false,
  subscriptions: true
})
*/

/*
export const devPx4sitlClient = createApolloClient({
  ssr: false,
  base: location.protocol + '//dev.maverick.one/web/api/px4sitl',
  endpoints: {
    graphql: '/graphql',
    subscription: '/subscriptions'
  },
  persisting: false,
  subscriptions: true
})
export const wwwClient = createApolloClient({
  ssr: false,
  base: location.protocol + '//www.maverick.one/web/api/sitl',
  endpoints: {
    graphql: '/graphql',
    subscription: '/subscriptions'
  },
  persisting: false,
  subscriptions: true
})
*/

/*
// Create vue apollo provider
export const apolloProvider = new VueApollo({
  clients: {
    // wwwSitl: wwwClient,
    devSitl: devSitlClient
    // devPx4sitl: devPx4sitlClient
  },
  defaultClient: devSitlClient
})
*/