const state = {
  mapState: true
}

const mutations = {
  setMapState (state, mapstate) {
    state.mapState = mapstate
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
