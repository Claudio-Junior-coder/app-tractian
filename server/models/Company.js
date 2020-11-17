const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  
  name: {type: String, required: true}

});


module.exports = mongoose.model("company", CompanySchema);
