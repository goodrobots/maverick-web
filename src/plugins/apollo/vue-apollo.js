import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
  createApolloClient,
  restartWebsockets
} from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
// const currentSite = location.hostname + (location.port ? ':' + location.port : '')
/*
const defaultEndpoint = '/web/api/fc'
const httpEndpoint = location.protocol + '//' + currentSite + defaultEndpoint + '/graphql'
const wsEndpoint = ((location.protocol === 'https:') ? 'wss://' : 'ws://') + currentSite + defaultEndpoint + '/subscriptions'
*/

// Config
/*
const defaultOptions = {
  httpEndpoint,
  wsEndpoint,
  tokenName: AUTH_TOKEN,
  persisting: true,
  websocketsOnly: false,
  ssr: false
}
*/

function createClient (options = {}) {
  const { apolloClient, wsClient } = createApolloClient(options)
  apolloClient.wsClient = wsClient
  return apolloClient
}

export function createProvider (options = {}) {
  // const fcClient = createClient(defaultOptions)
  const sitlClient = createClient({
    // httpEndpoint: location.protocol + '//' + currentSite + '/web/api/sitl/graphql',
    httpEndpoint: 'http://newdev.maverick.one:6801/graphql',
    wsEndpoint: 'ws://newdev.maverick.one:6801/subscriptions',
    // wsEndpoint: ((location.protocol === 'https:') ? 'wss://' : 'ws://') + currentSite + '/web/api/sitl/subscriptions',
    tokenName: AUTH_TOKEN,
    persisting: true,
    websocketsOnly: false,
    ssr: false
  })

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    clients: {
      // fc: fcClient,
      sitl: sitlClient
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network'
      }
    },
    // Global error handler for all smart queries and subscriptions
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    defaultClient: sitlClient
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
