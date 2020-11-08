const mongoose = require('mongoose');

const buyLeadSchema = new mongoose.Schema({
  watchlist,
  active,
  status,
  company,
  dateAdded,
  strikePrice,
});

module.exports = Chat = mongoose.model('BuyLead', buyLeadSchema);
