date = {
  to_s: function (datetime) {
    return (new Date(datetime)).toDateString()
  }
}

datetime = {
  to_s: function (time) {
    return (time ? Date() : Date(time)).toLocaleString()
  }
}
