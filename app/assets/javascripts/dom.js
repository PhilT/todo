const dom = {
  id: function (id) {
    return document.getElementById(id)
  },

  form: function (field) {
    const form = dom.id('new-task-container').querySelector('form')
    return field ? form.querySelector(`input[name=${field}]`) : form
  },

  task: function (id) {
    return dom.id(`task_${id}`)
  }
}
