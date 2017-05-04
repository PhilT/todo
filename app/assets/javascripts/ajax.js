module.exports = (method, url, data) => {
  return ajax({
    headers: {
      'content-type': 'application/json'
    },
    method: method,
    url: url,
    data: data && JSON.stringify(data)
  }).catch((error, xhr) => {
    document.querySelector('body').innerHTML = error
  })
}
