import Vue from 'vue'

const state = {
  measures: [],
}

const mutations = {
  'SET_MEASURES' (state, payload) {
    state.measures = payload
  },
  'UPDATE_MEASURE' (state, payload) {
    let measureIndex = state.measures.findIndex(measure => measure.id === payload.tag)
    if (measureIndex > -1) {
      Vue.set(state.measures, measureIndex, {...state.measures[measureIndex], ...payload}); // Vue.set to ensure new array items are observable
      Vue.set(state.measures[measureIndex], 'status', 'updated');
    }
  },
}

export default {
  state,
  mutations
}
