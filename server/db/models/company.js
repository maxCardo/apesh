const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  data: {
    dailyUpdate:{
      date : {
        type: Date,
        default: Date.now
      },
      ran: Boolean,
      success: Boolean
    },
    dailyNews:{
      date: {
        type: Date,
        default: Date.now,
      },
      ran: Boolean,
      success: Boolean
    },
    bs:{
      date: {
        type: Date,
        default: Date.now,
      },
      ran: Boolean,
      success: Boolean
    },
    earnings: {
      date: {
        type: Date,
        default: Date.now,
      },
      ran: Boolean,
      success: Boolean
    },
    kpi: {
      date: {
        type: Date,
        default: Date.now,
      },
      ran: Boolean,
      success: Boolean
    },


  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  companyName: String,
  exchange: String,
  exchangeShortName: String,
  sector: String,
  industry: String,
  website: String,
  description: String,
  ceo: String, 
  coutry: String, 
  fullTimeEmployees: Number,
  image: String,
  lastEarnings: Date, //depricated: replace by lastReporting.date
  lastReporting: {
    date: Date,
    estEPS: Number,
    actEPS: Number,
    estRev: Number,
    actRev: Number

  },
  nextReporting: {
    date: Date,
    estEPS: Number,
    estRev: Number 
  },
  valuation:[
    {
      date: {
        type: Date,
        default: Date.now,
      },
      by: String,
      growth: Number,
      peRatio: Number,
      eps: Number,
      growthCap: Number,
      discount: Number,
      currentValue: Number,
      futureValue: Number,
      buyTarget: Number
    }
  ],  
  cash: Number,
  debt: Number,
  cashDebtRatio: Number,
  growth: Number,
  peRatio: Number,
  eps: Number,
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
  },
  notes: [
    {
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
    },
  ],

});


module.exports = mongoose.model('Companies', companySchema);
