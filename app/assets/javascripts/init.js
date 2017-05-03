domready(function () {
  tasks.list()
  categories.fetch().then(response => {
    categories.all = response
    tasks.showForm()
    new Pikaday({ field: dom.id('datepicker') })
  })

})
