const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

const AssetsSchema = new Schema({
  image: String,
  name: {type: String, required: true},
  description: String,  
  model: {type: String, required: true},

  responsibles: [{
    type: ObjectId,
    ref: "Responsible",
    required: true}],

  state: {type: String, required: true},
  healthscore: {type: Number, required: true},  
  

  company: {
    type: ObjectId,
  required: true},

  unity: {
    type: ObjectId,
  required: true},

  
})

module.exports = model('Assets', AssetsSchema)