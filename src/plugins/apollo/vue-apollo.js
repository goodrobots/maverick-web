import Vue from 'vue'
import VueApollo from 'vue-apollo'
import createApolloClient from './apollo'

// Install the vue plugin
Vue.use(VueApollo)

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

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  clients: {
    // wwwSitl: wwwClient,
    devSitl: devSitlClient
    // devPx4sitl: devPx4sitlClient
  },
  defaultClient: devSitlClient
})
