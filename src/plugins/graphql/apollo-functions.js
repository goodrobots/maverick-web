import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

export function createClient (options = {}) {
  const { apolloClient, wsClient } = createApolloClient(options)
  apolloClient.wsClient = wsClient
  return apolloClient
}

// Manually call this when user log in
export async function onLogin (apolloClient, token, api, store) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
    // Set vuex client auth state to true
    store.state.apis[api].auth = true
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
