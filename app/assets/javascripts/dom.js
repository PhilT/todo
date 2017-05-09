module.exports = (() => {
  const id = function (domId) {
    return document.getElementById(domId)
  }

  const form = function () {
    return id('new-task-container').querySelector('form')
  }

  const byName = function (field) {
    return form().querySelector(`[name=${field}]`)
  }

  const task = function (domId) {
    return id(`task_${domId}`)
  }

  return {
    id,
    form,
    byName,
    task,
  }
})()
