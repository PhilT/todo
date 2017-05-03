date = {
  to_s: function (datetime) {
    return (new Date(datetime)).toDateString()
  }
}

datetime = {
  to_s: function (datetime) {
    return (datetime ? new Date() : new Date(datetime)).toLocaleString()
  }
}
