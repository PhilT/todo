//= require domready
//= require @fdaciuk/ajax/src/ajax
//= require pikaday
//= require_tree ../templates

const tasks = require('./tasks')
const categories = require('./categories')
const dom = require('./dom')
const ajax = require('./ajax')

domready(() => {
  tasks.list()
  categories.fetch(ajax).then((response) => {
    categories.all = response
    tasks.showForm()
    new Pikaday({ field: dom.id('datepicker') }) // eslint-disable-line no-new
  })
})
