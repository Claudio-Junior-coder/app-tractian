const mongoose = require('mongoose')

const UnitiesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  company: {type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  data: {
    countAssets: {type: Number, required: true},
    assetsData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets'
      }
    ]
  }
})

module.exports = mongoose.model('Unities', UnitiesSchema)