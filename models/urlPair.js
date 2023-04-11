const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlPairSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  randomString: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('UrlPair', urlPairSchema)