const state = {
  viewState: false
}

const mutations = {
  setViewState (state, viewstate) {
    state.viewState = viewstate
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
