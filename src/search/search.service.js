import { store } from '@/store/store'

const getResults = (searchTerm, pageType) => {
  store.commit('SET_SEARCHTERM', searchTerm)
  const visibleFiles = store.getters.visibleFiles(pageType)
  const results = visibleFiles
    .filter(file => seachFile(file, searchTerm))
    .map(file => { return { file, count: file.search.count } })
  if (results && results.length) {
    store.commit('SET_RESULTS', results)
  } else {
    // store.commit('SET_RESULTS', ['No results found'])
    store.commit('SET_RESULTS', [])
  }
}

const clearResults = (pageType) => {
  const files = store.state.search.results.map(result => result.file)
  files.forEach(file => {
    unmarkContent(file)
    file.search = null
  })
  store.commit('SET_SEARCHTERM', '')
  store.commit('SET_RESULTS', [])
}

const span = '<span class="mark-search" style="background-color: yellow;">'
const endspan = '</span>'

const seachFile = (file, searchTerm) => {
  if (!file || !file.content) {
    return false;
  }
  unmarkContent(file)
  const count = markContent(file, searchTerm)
  file.search = {
    markedTerm: searchTerm,
    count
  }
  return count > 0
}

const markContent = (file, searchTerm) => {
  const matches = getMatches(file, searchTerm)
  matches.reverse().forEach(index => {
    markMatch(file, index, searchTerm)
  });
  return matches.length
}

const markMatch = (file, index, searchTerm) => {
  file.content = [
    file.content.slice(0, index), 
    span,
    file.content.slice(index, index + searchTerm.length),
    endspan, 
    file.content.slice(index + searchTerm.length),
  ].join('')
}

const unmarkContent = (file) => {
  if (!file.search || !file.search.markedTerm) {
    return
  }
  const term = file.search.markedTerm
  const matches = getMatches(file, span + term + endspan)
  matches.reverse().forEach(index => {
    unmarkMatch(file, index, term)
  });
}

const unmarkMatch = (file, index, term) => {
  file.content = [
    file.content.slice(0, index),
    file.content.slice(index + span.length, index + span.length + term.length),
    file.content.slice(index + span.length + term.length + endspan.length),
  ].join('')  
}

const getMatches = (file, searchTerm) => {
  let matches = []
  let index = file.content.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase());
  while (index > -1) {
    matches.push(index)
    index = file.content.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase(), index + 1);
  }
  return matches
}

export default {
  getResults,
  clearResults,
}
