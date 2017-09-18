import Vue from 'vue'
import { store } from '../store'

const state = {
}

const mutations = {
  'ON_FETCH' (state, payload) {
    state[payload.tag] = payload.status 
  }
}

const actions = {
  waitForFetch: (context, {resource, fetch, fail, timeout}) => {
    return isLoaded(resource) ? Promise.resolve()
    : isInitial(resource) ? doFetch(resource, fetch, fail)
    : isLoading(resource) ? doWaitForLoading(resource, timeout)
    : null
  }
}

const doFetch = (resource, fetch, fail) => {
  if (!fetch) { 
    return doNoFetch(resource)
  }

  Vue.set(state, resource, 'loading');
  var t0 = performance.now();
  const fetchPromise = fetch()
  fetchPromise
    .then(_ => onFetched(resource, t0))
    .catch(_ => onFail(resource, fail))
  return fetchPromise
}

const onFetched = (resource, t0) => {
  var t1 = performance.now();
  store.commit('ON_FETCH', {tag: resource, status: `loaded ${Math.round(t1 - t0)} ms`})
}

const onFail = (resource, fail) => {
  store.commit('ON_FETCH', {resource, status: `failed`})
  if (fail) {
    fail()
  }
  console.error(`Failed to fetch ${resource}`)
}

const doNoFetch = (resource) => {
  // No fetch provided, so just indicate resource is not present
  Vue.set(state, resource, 'initial');
  return Promise.reject()
}

const doWaitForLoading = (resource, timeout) => {
  timeout = timeout || 3000
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (isLoaded(resource)) {
        resolve()  // Inform the waiter of success
      } else {
        reject()  // Inform the waiter of failure
      }
    }, timeout);
  })
}

const isInitial = (resource) => {
  return !state[resource] || (state[resource] !== 'loading' && state[resource].startsWith('loaded'))
}

const isLoaded = (resource) => {
  return state[resource] && state[resource].startsWith('loaded')
}

const isLoading = (resource) => {
  return state[resource] === 'loading'
}

export default {
  state,
  mutations,
  actions
}
