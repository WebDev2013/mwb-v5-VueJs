import DataService from '@/services/data.service'

const state = {
  files: {
    validations: [],
    referentials: [],
    clinics: []
  },
  selected: {
    validations: 0,
    referentials: 0,
    clinics: 0
  },
  numVisible: {
    validations: 5,
    referentials: 5,
    clinics: 5
  },
}

const getters = {
  visibleFiles: state => {
    return page => {
      const numVisible = state.numVisible[page]
      const files = state.files[page]
      return files.slice(0, numVisible)
    }
  },
  pages: state => {
    return page => {
      return {
        files: state.pages.files[page],
        numVisible: state.pages.numVisible[page],
        fileInfo: state.pages.files[state.selected[page]],
      }
    }
  }
}

const mutations = {
  'SET_FILES' (state, payload) {
    // for (let key in payload) {
    //   const value = payload[key]
    //   if (value) {
    //     state.files[key] = value
    //   }
    // }
    state.files[payload.page] = payload.files
  },
  'UPDATE_NUMVISIBLE' (state, payload) {
    state.numVisible[payload.page] = payload.numVisible
  }
}

const actions = {
  updateNumVisible: (context, payload) => {
    DataService.updateContent(payload.page, payload.numVisible)
      .then(_ => {
        context.commit('UPDATE_NUMVISIBLE', payload)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
