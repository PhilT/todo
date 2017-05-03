const dom = {
  id: function (id) {
    return document.getElementById(id)
  },

  form: function () {
    return dom.id('new-task-container').querySelector('form')
  },

  by_name: function (field) {
    return dom.form().querySelector(`[name=${field}]`)
  },

  task: function (id) {
    return dom.id(`task_${id}`)
  }
}
