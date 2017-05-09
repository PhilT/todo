const test = require('tape')
const subject = require('../../app/assets/javascripts/categories')

test('fetch makes request to /categories endpoint', (assert) => {
  assert.plan(1)

  const ajax = (method, url) => ({
    method,
    url,
  })

  assert.deepEqual(subject.fetch(ajax), { method: 'GET', url: '/categories' })
})
