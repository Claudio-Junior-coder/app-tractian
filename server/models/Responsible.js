const mongoose = require('mongoose')

const ResponsibleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    responsibleAssets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assets'
    }]
})

module.exports = mongoose.model('Responsible', ResponsibleSchema)