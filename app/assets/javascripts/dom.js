module.exports = (() => {
  const id = function(id) {
    return document.getElementById(id)
  }

  const form = function() {
    return id('new-task-container').querySelector('form')
  }

  const by_name = function(field) {
    return form().querySelector(`[name=${field}]`)
  }

  const task = function(id) {
    return id(`task_${id}`)
  }

  return {
    id,
    form,
    by_name,
    task
  }
})()
