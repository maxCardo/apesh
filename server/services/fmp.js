const axios = require('axios')
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
    //console.error(err);
  }
}

// @desc:
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

module.exports = {getStockData, getBlnceSheet, getPastQuote, getQuote, getAll, getCompanyProf}