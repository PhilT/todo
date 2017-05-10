const test = require('tape')
const subject = require('../../app/assets/javascripts/ajax')

document = {} // eslint-disable-line no-global-assign
const ajax = options => ({
  options,
  catch() {
    return options
  },
})

test('calls ajax with correct params', (assert) => {
  assert.plan(4)

  const params = subject('GET', '/url', { data: 'value' }, ajax)
  assert.deepEqual(params.headers, { 'content-type': 'application/json' })
  assert.equal(params.method, 'GET')
  assert.equal(params.url, '/url')
  assert.equal(params.data, '{"data":"value"}')
})

test('does not try to stringify when no data', (assert) => {
  assert.plan(2)

  const params = subject('GET', '/url', null, ajax)
  assert.equal(params.method, 'GET')
  assert.equal(params.data, null)
})

test('catch writes error to page', (assert) => {
  assert.plan(2)

  const ajaxWithError = () => ({
    catch(func) {
      func('error')
    },
  })

  const doc = {
    querySelector(selector) {
      this.selector = selector
      this.innerHTML = null
      return this
    },
  }

  subject('GET', '/url', null, ajaxWithError, doc)

  assert.equal(doc.selector, 'body')
  assert.equal(doc.innerHTML, 'error')
})
