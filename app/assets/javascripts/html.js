const html = {
  select_tag: function (items, type) {
    let select = `<select name="${type}">`
    items.forEach(item => {
      select += `<option value="${item.id}">${item.name}</option>`
    })
    select += '</select>'
    return select;
  }
}
