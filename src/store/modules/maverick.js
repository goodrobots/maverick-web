import { schema } from '../modules/schema'
import { graphqlSchema } from '../modules/graphqlSchema'
const state = {
  graphqlSchema: graphqlSchema,
  monacoSchema: schema,
  monacoCode: [
      "{",
      "    ",
      "}"
    ].join('\n')
}
  
const mutations = {
}
  
export default {
  namespaced: true,
  state,
  mutations
}