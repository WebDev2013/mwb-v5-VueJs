import Vue from 'vue'

export default {
  getFileList () {
    return Vue.http.get('filelist.txt')
    .then((response) => {
      const files = response.body.replace(/\r/, '').split(/\n/)
      return files
    })
  },
  getFile (fileInfo) {
    const url = fileInfo.name.trim() + '.html';
    return Vue.http.get(url)
    .then((response) => {
      return response;
    })
  }
}
