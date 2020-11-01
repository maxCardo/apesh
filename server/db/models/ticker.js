const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true
  },
  companyName: {
      type: String
  },
  industry: {
    type: String
  },

});

module.exports = Chat = mongoose.model('Tickers', tickerSchema);
