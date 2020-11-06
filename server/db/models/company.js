const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: String,
  exchange: String,
  sector: String,
  industry: String,
  website: String,
  description: String,
  fullTimeEmployees: Number,
});

module.exports = Chat = mongoose.model('Companies', companySchema);
