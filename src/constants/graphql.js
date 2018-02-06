import gql from 'graphql-tag'

export const STATE_QUERY = gql`
  query stateQuery {
   stateMessage {
     id
     seq
     secs
     nsecs
     frameId
     connected
     armed
     guided
     mode
     systemStatus
   }
  }
`

export const STATE_SUBSCRIPTION = gql`
  subscription stateSubscription {
   stateMessage {
     id
     seq
     secs
     nsecs
     frameId
     connected
     armed
     guided
     mode
     systemStatus
   }
  }
`
