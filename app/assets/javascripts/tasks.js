const tasks = {
  list: function () {
    const div = dom.id('list-container')

    request('GET', '/tasks').then(function (response, xhr) {
      let html = '<ul>'
      response.forEach(function (task) {
        const task_id = `task_${task.id}`
        const due_fragment = task.due_at ? `due on <strong>${date.to_s(task.due_at)}</strong>` : ''
        const checked = task.completed_at ? ' checked' : ''
        html += `
          <li id="${task_id}_item">
            <div>
              <input type="checkbox" name="${task_id}" id="${task_id}"${checked}>
              <label for="${task_id}">
                ${task.name}
                (${task.category})
              </label>
            </div>
            <div class="details">
              <span>by ${task.created_by}</span>
              <span>${due_fragment}</span>
            </div>
          </li>`
      })
      html += '<ul>'
      div.innerHTML = html

      response.forEach(function (task) {
        dom.id(`task_${task.id}`).addEventListener('click', event => {
          if (event.target.checked) {
            tasks.complete(task.id, datetime.to_s())
          } else {
            tasks.restart(task.id)
          }
        })
      })
    })
  },

  create: function (attributes) {
    request('POST', '/tasks', {task: attributes}).then(function (response, xhr) {
      tasks.list()
    })
  },

  complete: function (id, at) {
    const data = { task: {completed_at: at} }
    request('PATCH', `/tasks/${id}`, data)
  },

  restart: function (id) {
    tasks.complete(id, null)
  },

  showForm: function () {
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
        tasks.create({
          name: dom.by_name('name').value,
          category_id: dom.by_name('category_id').value,
          due_at: dom.by_name('due_on').value
        })
      } else {
        dom.id('errors').innerHTML = 'New tasks require a name and category'
        window.setTimeout(function () {
          dom.id('errors').innerHTML = ''
        }, 5000)
      }
    })

  }
}
