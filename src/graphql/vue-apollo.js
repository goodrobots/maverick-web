import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './apollo'

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
  endpoint: {
    uri: location.protocol + '//dev.maverick.one/web/api/sitl',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
export const devPx4sitlClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//dev.maverick.one/web/api/px4sitl',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
export const wwwClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//www.maverick.one/web/api/sitl',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  clients: {
    wwwSitl: wwwClient,
    devSitl: devSitlClient,
    devPx4sitl: devPx4sitlClient
  },
  defaultClient: wwwClient
})
