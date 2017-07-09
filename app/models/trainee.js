var mongoose = require('mongoose');

module.exports = mongoose.model('trainees', {
  batch: String,
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: Number,
  client_calls: String,
  client_call_date: String
})
