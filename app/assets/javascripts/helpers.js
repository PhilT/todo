module.exports = {
  toDate(datetimeString) {
    return (new Date(datetimeString)).toDateString()
  },

  toDateTime(time = null) {
    return (time ? new Date(time) : new Date()).toLocaleString()
  }
}
