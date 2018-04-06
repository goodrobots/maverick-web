const state = {
  mapState: true,
  hudState: true
}

const mutations = {
  setMapState (state, mapstate) {
    state.mapState = mapstate
  },
  setHudState (state, hudstate) {
    state.hudState = hudstate
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
