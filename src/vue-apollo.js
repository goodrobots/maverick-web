import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './apollo'

// Install the vue plugin
Vue.use(VueApollo)

// Create apollo clients
export const localClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//' + location.hostname + ':' + location.port + '/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
export const devClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//dev.maverick.one/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})
export const wwwClient = createApolloClient({
  ssr: false,
  endpoint: {
    uri: location.protocol + '//www.maverick.one/maverick-api',
    queryPath: '/graphql',
    subscriptionsPath: '/subscriptions',
    persist: false
  }
})

// Create vue apollo provider
export const apolloProvider = new VueApollo({
  clients: {
    local: localClient,
    dev: devClient,
    www: wwwClient
  },
  defaultClient: localClient
})
