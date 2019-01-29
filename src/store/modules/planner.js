const state = {
  viewState: false,
  mapZoom: 16,
  mapCenter: true,
  mapVehicleInfo: true,
  mapLayer: 'osm'
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
  },
  setMapVehicleInfo (state, active) {
    state.mapVehicleInfo = active
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
