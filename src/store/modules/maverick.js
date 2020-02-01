import { schema } from '../modules/schema'
const state = {
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