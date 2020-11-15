const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  
  name: {type: String, required: true},
  email: String,

});


module.exports = mongoose.model("company", CompanySchema);
