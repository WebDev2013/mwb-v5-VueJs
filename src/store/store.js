import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config.store'
import pages from './modules/pages.store'
import measures from './modules/measures.store'
import user from './modules/user.store'
import loadStatus from './modules/load-status.store'
import search from './modules/search.store'

Vue.use(Vuex)

const storePlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.payload.tag) {
      mutation.type = `${mutation.type} / ${mutation.payload.tag}` 
    }
  })
}

export const store = new Vuex.Store({
  modules: {
    config,
    pages,
    measures,
    user,
    loadStatus,
    search
  },
  plugins: [storePlugin]
})

