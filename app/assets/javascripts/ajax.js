module.exports = (method, url, data, ajax = window.ajax) =>
  ajax({
    headers: { 'content-type': 'application/json' },
    method,
    url,
    data: data && JSON.stringify(data),
  }).catch((error) => {
    document.querySelector('body').innerHTML = error
  })
