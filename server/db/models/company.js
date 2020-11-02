const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
      type: String
  },
  exchange: {
    type: String
  }, 
  industry: {
    type: String
  },

});

module.exports = Chat = mongoose.model('Companies', companySchema);
