import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './apollo'

// Install the vue plugin
Vue.use(VueApollo)

// Create apollo clients
export const devApolloClient = createApolloClient({
  ssr: false,
  endpoint: {
    // uri: location.protocol + '//' + location.hostname + ':' + location.port + '/maverick-api',
    uri: 'http://dev.maverick.one/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
export const wwwApolloClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: 'http://www.maverick.one/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  clients: {
    dev: devApolloClient,
    www: wwwApolloClient
  },
  defaultClient: devApolloClient
})
