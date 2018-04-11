const state = {
  viewState: false,
  mapZoom: 15,
  mapCenter: true,
  mapLayer: 'googleterrain'
}

const mutations = {
  setViewState (state, viewstate) {
    state.viewState = viewstate
  },
  setMapZoom (state, zoom) {
    state.mapZoom = zoom
  },
  setMapCenter (state, center) {
    state.mapCenter = center
  },
  setMapLayer (state, layer) {
    state.mapLayer = layer
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
