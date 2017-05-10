module.exports = (method, url, data, ajax = window.ajax, doc = document) =>
  ajax({
    headers: { 'content-type': 'application/json' },
    method,
    url,
    data: data && JSON.stringify(data),
  }).catch((error) => {
    doc.querySelector('body').innerHTML = error
  })
