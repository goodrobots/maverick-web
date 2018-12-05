import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { onError } from 'apollo-link-error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from 'apollo-utilities'
import { split, from } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import MessageTypes from 'subscriptions-transport-ws/dist/message-types'

const AUTH_TOKEN = 'apollo-token'

export function createClient (options = {}) {
  const { apolloClient, wsClient } = createApolloClient(options)
  apolloClient.wsClient = wsClient
  return apolloClient
}

export function createApolloClient ({
  httpEndpoint,
  wsEndpoint = null,
  tokenName = AUTH_TOKEN,
  websocketsOnly = false,
  // Custom starting link.
  // If you want to replace the default HttpLink, set `defaultHttpLink` to false
  link = null,
  // If true, add the default HttpLink.
  // Disable it if you want to replace it with a terminating link using `link` option.
  defaultHttpLink = true,
  // Options for the default HttpLink
  httpLinkOptions = {},
  // Additional Apollo client options
  apollo = {},
  // apollo-link-state options
  clientState = null,
  // Function returning Authorization header token
  getAuth = defaultGetAuth
}) {
  let wsClient, authLink
  let cache = new InMemoryCache()

  /*
  const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
    console.log(`[operation] :`)
    console.log(operation)
    console.log(`[response] : ${response}`)
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(`[GraphQl error] : Message : ${message}, Location : ${locations}, Path : ${path}`)
      })
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })
  */

  if (!websocketsOnly) {
    const httpLink = createUploadLink({
      uri: httpEndpoint,
      ...httpLinkOptions
    })

    // HTTP Auth header injection
    authLink = setContext((_, { headers }) => {
      const authorization = getAuth(tokenName)
      const authorizationHeader = authorization ? { authorization } : {}
      return {
        headers: {
          ...headers,
          ...authorizationHeader
        }
      }
    })

    // Concat all the http link parts
    // link = from([errorLink, httpLink])
    link = from([httpLink])
    link = authLink.concat(link)
  }

  /*
  // If on the client, recover the injected state
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    const state = window.__APOLLO_STATE__
    if (state) {
      // If you have multiple clients, use `state.<client_id>`
      cache.restore(state.defaultClient)
    }
  }
  */

  // Web socket
  if (wsEndpoint) {
    wsClient = new SubscriptionClient(wsEndpoint, {
      reconnect: false,
      connectionParams: () => {
        const authorization = getAuth(tokenName)
        return authorization ? { authorization } : {}
      }
    })
    // wsClient.client.onerror = (e) => { console.log(e) }

    // Create the subscription websocket link
    let wsLink = new WebSocketLink(wsClient)
    // wsLink = from([errorLink, wsLink])

    if (websocketsOnly) {
      link = wsLink
    } else {
      link = split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query)
          return kind === 'OperationDefinition' &&
            operation === 'subscription'
        },
        wsLink,
        link
      )
    }
  }

  const apolloClient = new ApolloClient({
    link,
    cache,
    // This will temporary disable query force-fetching
    ssrForceFetchDelay: 100,
    // Apollo devtools
    connectToDevTools: process.env.NODE_ENV !== 'production',
    ...apollo
  })

  return {
    apolloClient,
    wsClient
  }
}

export function restartWebsockets (wsClient) {
  // Copy current operations
  const operations = Object.assign({}, wsClient.operations)

  // Close connection
  wsClient.close(true)

  // Open a new one
  wsClient.connect()

  // Push all current operations to the new connection
  Object.keys(operations).forEach(id => {
    wsClient.sendMessage(
      id,
      MessageTypes.GQL_START,
      operations[id].options
    )
  })
}

function defaultGetAuth (tokenName) {
  if (typeof window !== 'undefined') {
    // get the authentication token from local storage if it exists
    const token = window.localStorage.getItem(tokenName)
    // return the headers to the context so httpLink can read them
    return token ? `Bearer ${token}` : ''
  }
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
