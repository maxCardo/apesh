const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: String,
  exchange: String,
  exchangeShortName: String,
  sector: String,
  industry: String,
  website: String,
  description: String,
  ceo: String, 
  fullTimeEmployees: Number,
  image: String,
  lastEarnings: Date,
  history: [{
    type: {
      //note, log etc
      type: String,
    },
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],  
});


module.exports = mongoose.model('Companies', companySchema);
