//= require domready
//= require @fdaciuk/ajax/src/ajax
//= require pikaday
//= require_tree ../templates

const tasks = require('./tasks')
const categories = require('./categories')
const dom = require('./dom')

domready(() => {
  tasks.list()
  categories.fetch().then(response => {
    categories.all = response
    tasks.showForm()
    new Pikaday({ field: dom.id('datepicker') })
  })
})
