const request = require('./ajax')
const helpers = require('./helpers')
const dom = require('./dom')
const categories = require('./categories')

module.exports = {
  checkIcon(checked) {
    return checked ? 'fa fa-check-square' : 'fa fa-square-o'
  },

  list() {
    const div = dom.id('list-container')

    request('GET', '/tasks').then((response) => {
      let html = '<ul>'
      response.forEach((task) => {
        const taskId = `task_${task.id}`
        const dueFragment =
          task.due_at && !task.completed_at
          ? `due on <strong>${helpers.toDate(task.due_at)}</strong>`
          : ''
        const timeTaken = task.completed_at ? `Completed in ${task.timeTaken}` : ''
        const checked = task.completed_at ? ' checked' : ''

        html += JST.list({
          taskId,
          task,
          tasks: this,
          checked,
          timeTaken,
          dueFragment,
        })
      })
      html += '<ul>'
      div.innerHTML = html

      response.forEach((task) => {
        dom.id(`task_${task.id}`).addEventListener('click', (event) => {
          if (event.target.checked) {
            this.complete(task.id, helpers.toDateTime())
          } else {
            this.restart(task.id)
          }
          const icon = document.querySelector(`#task_${task.id}_item i`)
          icon.setAttribute('class', this.checkIcon(event.target.checked))
        })
      })
    })
  },

  create(attributes) {
    request('POST', '/tasks', {
      task: attributes,
    }).then(() => {
      this.list()
    })
  },

  complete(id, at) {
    const data = { task: { completed_at: at } }
    request('PATCH', `/tasks/${id}`, data)
  },

  restart(id) {
    this.complete(id, null)
  },

  showForm() {
    const div = dom.id('new-task-container')

    div.innerHTML = JST.form({ categories: categories.all })

    dom.form('name').focus()

    dom.form().addEventListener('submit', (event) => {
      event.preventDefault()

      if (dom.byName('name').value && dom.byName('category_id').value) {
        this.create({
          name: dom.byName('name').value,
          category_id: dom.byName('category_id').value,
          due_at: dom.byName('due_on').value,
        })
      } else {
        dom.id('errors').innerHTML = 'New tasks require a name and category'
        window.setTimeout(() => {
          dom.id('errors').innerHTML = ''
        }, 5000)
      }
    })
  },
}
