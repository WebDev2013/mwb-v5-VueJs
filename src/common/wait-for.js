export const waitForStatus = ({check, fetch, fail, timeout}) => {
  timeout = timeout || 3000
  if (check() === 'loaded') {
    return Promise.resolve()
  }
  if (check() === 'initial') {
    return fetch()
  }
  if (check() === 'loading') {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (check() === 'loaded') {
          resolve()
        } else {
          if (fail) {
            fail()
          }
          reject()
        }
      }, timeout);
    })
  }
}
