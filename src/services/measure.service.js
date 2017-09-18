import Vue from 'vue'
import { store } from '../store/store'
import HistoryService from './history.service'

export default {
  checkMeasures () {
    return store.dispatch('waitForFetch', {
      resource: 'measures',
      fetch: this.getMeasures
    })
  },
  getMeasures () {
    return Vue.http.get('InitialMeasures.json')
    .then(response => {
      return response.json()
    })
    .then((data) => {
      data.measures.forEach(measure => {
        measure.history = measure.history || []  // Ensure property for reactive update
      })
      store.commit('SET_MEASURES', data.measures)
    })
  },
  updateMeasures () {
    const measures = store.state.measures.measures
    const files = store.state.pages.files
    updateValidationsMeasure(measures, files);
    updateReferentialsMeasure(measures, files);
    updateClinicsMeasure(measures, files);
  }
}

const updateValidationsMeasure = (measures, files) => {
  const first = files.validations[0]
  const update = {
    tag: 'validations',
    metric: first.metric,
    color: first.badgeColor,
    history: HistoryService.validationsHistory(files.validations)
  }
  store.commit('UPDATE_MEASURE', update)
}

const updateReferentialsMeasure = (measures, files) => {
  const history = HistoryService.referentialsHistory(files.referentials);
  const metric = history[history.length - 1];
  const update = {
    tag: 'referentials',
    metric: metric,
    color: metric === 0 ? 'green'
      : metric < 10 ? 'orange' 
      : 'red',
    history: history
  }
  store.commit('UPDATE_MEASURE', update)
}

const updateClinicsMeasure = (measures, files) => {
  const first = files.clinics[0]
  const update = {
    tag: 'clinics',
    metric: first.metric,
    color: first.badgeColor,
    history: HistoryService.clinicsHistory(files.clinics)
  }
  store.commit('UPDATE_MEASURE', update)
}

