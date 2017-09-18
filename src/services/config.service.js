import Vue from 'vue'
import { store } from '../store/store'

export default {
  checkConfig () {
    return store.dispatch('waitForFetch', {
      resource: 'config',
      fetch: this.getConfig
    })
  },
  getConfig () {
    return Vue.http.get('migration-workbench.config.json')
      .then((response) => {
        store.commit('SET_CONFIG', response.body)
      })
  }
}
