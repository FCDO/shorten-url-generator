const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  origin_url: {
    type: String,
    required: true
  },
  url_code: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', urlSchema)