const tasks = {
  request: ajax({
    headers: {
      'content-type': 'application/json'
    }
  }),

  list: function () {
    const div = dom.id('list-container')

    tasks.request.get('/tasks').then(function (response, xhr) {
      let html = '<ul>'
      response.forEach(function (task) {
        const task_id = `task_${task.id}`
        html += `
          <li>
            <input type="checkbox" name="${task_id}">
            <label for="${task_id}">${task.name} (${task.category})</label>
          </li>`
      })
      html += '<ul>'
      div.innerHTML = html
    }).catch(function (error, xhr) {
      document.querySelector('body').innerHTML = error
    })
  },

  create: function (attributes) {
    tasks.request.post('/tasks', JSON.stringify({task: attributes})).then(function (response, xhr) {
      tasks.list()
    }).catch(function (error, xhr) {
      document.querySelector('body').innerHTML = error
    })
  },

  showForm: function () {
    const div = dom.id('new-task-container')

    div.innerHTML = `
      <form method="post" action="/tasks">
        <input type="text" name="name" placeholder="Task name">
        <input type="text" name="category" placeholder="e.g. general">
        <label for="due_at">Due</label>
        <input type="text" name="due_at" id="datepicker">
        <input type="submit" value="Add">
      </form>
    `

    dom.form('name').focus()

    dom.form().addEventListener('submit', event => {
      event.preventDefault()

      if (dom.form('name').value && dom.form('category').value) {
        tasks.create({
          name: dom.form('name').value,
          category: dom.form('category').value,
          due_at: dom.form('due_at').value
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
