const tasks = {
  list: function () {
    const list = document.getElementById('list')
    const request = ajax({
      headers: {
        'content-type': 'application/json'
      }
    })

    const task = JSON.stringify({
      task: {
        name: 'A Task',
        category: 'general'
      }
    })

    ajax().get('/tasks').then(function (response, xhr) {
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
      list.innerHTML = html
    }).catch(function (error, xhr) {
      document.querySelector('body').innerHTML = error
    })
  },

  showForm: function () {
    const newtask = document.getElementById('newtask')

    newtask.innerHTML = `
      <form method="post" action="/tasks">
        <input type="text" name="name" placeholder="Task name">
        <input type="text" name="category" placeholder="e.g. general">
        <label for="due_at">Due</label>
        <input type="text" name="due_at" placeholder="YYYY-MM-DD HH:MM">
        <input type="submit" value="Add">
      </form>
    `
  }
}
