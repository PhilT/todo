const request = function (method, url, data) {
  return ajax({
    headers: {
      'content-type': 'application/json'
    },
    method: method,
    url: url,
    data: data && JSON.stringify(data)
  }).catch(function (error, xhr) {
    document.querySelector('body').innerHTML = error
  })
}
