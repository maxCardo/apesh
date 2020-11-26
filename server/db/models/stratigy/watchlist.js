const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  //user, ref to user of stratigy 
  symbol: {  // can remove once we start saving company _id  on scan
    type: String,
    unique: true
  }, 
  active: {
    type: Boolean,
    default: true
  },
  status: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Companies'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  value: Number, 
  strikePrice: Number,
  notes: [{
    type: {
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
  }]
})

module.exports = mongoose.model('Watchlist', watchlistSchema);
