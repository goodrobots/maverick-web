import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

/* global location */
const currentSite = location.hostname + (location.port ? ':' + location.port : '')
const defaultEndpoint = '/web/api/fc'

// Config
const defaultOptions = {
  httpEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || location.protocol + '//' + currentSite + defaultEndpoint + '/graphql',
  wsEndpoint: process.env.VUE_APP_GRAPHQL_HTTP || ((location.protocol === 'https:') ? 'wss://' : 'ws://') + currentSite + defaultEndpoint + '/subscriptions',
  tokenName: AUTH_TOKEN,
  persisting: true,
  websocketsOnly: false,
  ssr: false
}

function createClient (options = {}) {
  const { apolloClient, wsClient } = createApolloClient(options)
  apolloClient.wsClient = wsClient
  return apolloClient
}

export function createProvider (options = {}) {
  // const fcClient = createClient(defaultOptions)
  const sitlClient = createClient({
    httpEndpoint: location.protocol + '//' + currentSite + '/web/api/sitl/graphql',
    wsEndpoint: ((location.protocol === 'https:') ? 'wss://' : 'ws://') + currentSite + '/web/api/sitl/subscriptions',
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
/* global localStorage */
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
