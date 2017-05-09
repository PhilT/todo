const test = require('tape')
const subject = require('../../app/assets/javascripts/ajax')

const ajax = options => ({
  options,
  catch() {
    return this
  },
})

test('sets content-type', (assert) => {
  assert.plan(1)

  const actual = subject('GET', '/url', {}, ajax)
  assert.deepEqual(actual.options.headers, { 'content-type': 'application/json' })
})
