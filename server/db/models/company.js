const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  data: {
    dailyUnpdate:{
      date : Date,
      ran: Boolean,
      success: Boolean
    }
  },
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
  lastClose: {
    price: Number,
    high: Number,
    low: Number,
    volume: Number,
    vwap: Number,
    volatility: Number,
    volatPct: Number

  },
  average_5:{
    price: Number,
    high: Number,
    low: Number,
    volume: Number,
    vwap: Number,
    volatility: Number,
    volatPct: Number,
    avgDayVolat: Number,
    avgDayValatPct: Number
  },
  average_10: {
    price: Number,
    high: Number,
    low: Number,
    volume: Number,
    vwap: Number,
    volatility: Number,
    volatPct: Number,
    avgDayVolat: Number,
    avgDayValatPct: Number
  },
  average_22: {
    price: Number,
    high: Number,
    low: Number,
    volume: Number,
    vwap: Number,
    volatility: Number,
    volatPct: Number,
    avgDayVolat: Number,
    avgDayValatPct: Number
  },
  mentions: {
    last_24: Number,
    last_7: Number,
    last_15: Number,
    last_30: Number 
  }

});


module.exports = mongoose.model('Companies', companySchema);
