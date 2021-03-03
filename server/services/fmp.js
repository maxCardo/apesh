const axios = require('axios')
const moment = require('moment')
const {fmpKey} = require('../config/creds')


// @desc: get data on single ticker by quarter
const getStockData = async (tikr) =>{
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/key-metrics/${tikr}?limit=3&apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data  
  } catch (err) {
    console.log('error fires getStockData');
    console.error(err);
  }
}

// @desc: get quarterly balance sheet for selected symbol
const getBlnceSheet = async (tikr) =>{
  try {
   const res = await axios({
     url: `https://fmpcloud.io/api/v3/balance-sheet-statement/${tikr}?period=quarter&limit=1&apikey=${fmpKey}`,
     method: 'get',
   });
   return res.data 
  } catch (err) {
    console.log('error fired getBalnceSheet');
    
  }
   
}

// @desc:
const getPastQuote = async (tikr, startDate, endDate) =>{
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/historical-price-full/${tikr}?from=${startDate}&to=${endDate? endDate: startDate}&apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data

  } catch (err) {
    console.log('error fired getPastQuote');
        
  }
}

// @desc:
const getQuote = async (tikr) =>{
  try {
   const res = await axios({
     url: `https://fmpcloud.io/api/v3/quote/${tikr}?apikey=${fmpKey}`,
     method: 'get',
   });
   return res.data 
  } catch (err) {
    console.log('errror fired getQuote');
        
  }
}

// @desc: histocial price last trade day
const getIdxQuote = async (tikr , timeSeries = 1) => {
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/historical-price-full/${tikr}?timeseries=${timeSeries}&apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data
  } catch (err) {
    console.log('errror fired getQuote');

  }
}
// @desc: get all tickers in exchage. Available: nyse, nasdaq, etf
const getAll = async (exchange) =>{
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/quotes/${exchange}?apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data  
  } catch (err) {
    console.log('error fired on getAll');
    
  }
}

// @desc: get company profile (returns price and volume as well)
const getCompanyProf = async (tikr) =>{
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/profile/${tikr}?apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data  
  } catch (err) {
    console.log('error fired on getCompanyProf');
    
  }
}

// @desc: get latist news on company
const getCompanyNews = async (tikr,limit,backDate) => {
  limit = !limit ? 25 : limit
  backDate = !backDate ? 30 : backDate
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/stock_news?tickers=${tikr}&limit=${limit}&apikey=${fmpKey}`,
      method: 'get',
    });
    const fromDate = moment().subtract(backDate, 'd')
    const result = res.data.filter((news) => new Date(news.publishedDate) > fromDate) 
    return result

  } catch (err) {
    console.log('error fired on getCompanyProf');
    console.error(err);

  }
}

const getHistoricalPriceData = async (tikr, timeSeries = 30) => {
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/historical-price-full/${tikr}?timeseries=${timeSeries}&apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data

  } catch (err) {
    console.log('error fired getPastQuote');

  }
}

//@desc: get upcoming earnings schedualed for next 30 days
const getEarningsCal = async () => {
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/earning_calendar?apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data

  } catch (err) {
    console.log('error fired getPastQuote');

  }
}

//@desc: get earnings results for seslected symbol
const getEarningsRes = async (tikr) => {
  try {
    const res = await axios({
      url: `https://fmpcloud.io/api/v3/earnings-surpises/${tikr}?apikey=${fmpKey}`,
      method: 'get',
    });
    return res.data

  } catch (err) {
    console.log('error fired getPastQuote');

  }
}

module.exports = {getStockData, getBlnceSheet, getPastQuote, getQuote, getAll, getCompanyProf, getIdxQuote, getCompanyNews, getHistoricalPriceData, getEarningsCal, getEarningsRes}