module.exports = {
  fetch(ajax) {
    return ajax('GET', '/categories')
  },
}
