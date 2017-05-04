module.exports = {
  fetch() {
    return require('./ajax')('GET', '/categories')
  }
}
