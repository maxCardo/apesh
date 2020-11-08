const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  //user, ref to user of stratigy 
  symbol: String, // can remove once we start saving company _id  on scan
  active: Boolean,
  status: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  strikePrice: Number,
})

module.exports = Chat = mongoose.model('Watchlist', watchlistSchema);
