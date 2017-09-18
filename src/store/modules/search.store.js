
const state = {
  searchTerm: '',
  results: []
}

const mutations = {
  'SET_RESULTS' (state, payload) {
    state.results = payload
  },
  'SET_SEARCHTERM' (state, payload) {
    state.searchTerm = payload
  }
}

export default {
  state,
  mutations,
}
