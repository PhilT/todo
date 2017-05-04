const request = require('./ajax')
const helpers = require('./helpers')
const dom = require('./dom')
const html = require('./html')
const categories = require('./categories')

module.exports = {
  check_icon(checked) {
    return checked ? 'fa fa-check-square' : 'fa fa-square-o'
  },

  list() {
    const div = dom.id('list-container')

    request('GET', '/tasks').then((response, xhr) => {
      let html = '<ul>'
      response.forEach(task => {
        const task_id = `task_${task.id}`
        const due_fragment =
          task.due_at && !task.completed_at
          ? `due on <strong>${helpers.toDate(task.due_at)}</strong>`
          : ''
        const time_taken = task.completed_at ? `Completed in ${task.time_taken}` : ''
        const checked = task.completed_at ? ' checked' : ''

        html += `
          <li id="${task_id}_item">
            <div>
              <input type="checkbox" name="${task_id}" id="${task_id}"${checked}>
              <label for="${task_id}">
                <i class="fa ${this.check_icon(task.completed_at)}"></i>
                ${task.name}
                (${task.category})
              </label>
            </div>
            <div class="details">
              <span>by ${task.created_by}</span>
              <span>${due_fragment}${time_taken}</span>
            </div>
          </li>`
      })
      html += '<ul>'
      div.innerHTML = html

      response.forEach(task => {
        dom.id(`task_${task.id}`).addEventListener('click', event => {
          if (event.target.checked) {
            this.complete(task.id, helpers.toDateTime())
          } else {
            this.restart(task.id)
          }
          const icon = document.querySelector(`#task_${task.id}_item i`)
          icon.setAttribute('class', this.check_icon(event.target.checked))
        })
      })
    })
  },

  create(attributes) {
    request('POST', '/tasks', {task: attributes}).then((response, xhr) => {
      this.list()
    })
  },

  complete(id, at) {
    const data = { task: {completed_at: at} }
    request('PATCH', `/tasks/${id}`, data)
  },

  restart(id) {
    this.complete(id, null)
  },

  showForm() {
    const div = dom.id('new-task-container')

    div.innerHTML = `
      <form method="post" action="/tasks">
        <input type="text" name="name" placeholder="Task name">
        ${html.select_tag(categories.all, 'category_id')}
        <label for="due_on">Due</label>
        <input type="text" name="due_on" id="datepicker">
        <input type="submit" value="Add">
      </form>
    `

    dom.form('name').focus()

    dom.form().addEventListener('submit', event => {
      event.preventDefault()

      if (dom.by_name('name').value && dom.by_name('category_id').value) {
        this.create({
          name: dom.by_name('name').value,
          category_id: dom.by_name('category_id').value,
          due_at: dom.by_name('due_on').value
        })
      } else {
        dom.id('errors').innerHTML = 'New tasks require a name and category'
        window.setTimeout(() => {
          dom.id('errors').innerHTML = ''
        }, 5000)
      }
    })
  }
}
