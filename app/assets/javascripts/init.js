domready(function () {
  tasks.list()
  tasks.showForm()

  new Pikaday({ field: dom.id('datepicker') })
})
