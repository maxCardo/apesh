const axios = require('axios')
const {fmpKey} = require('../config/creds')

// @desc: get data on single ticker by quarter
const getStockData = async (tikr) => await axios({
    url: `https://fmpcloud.io/api/v3/key-metrics/${tikr}?period=quarter&limit=130&apikey=${fmpKey}`,
    method: 'get',
})

const getBlnceSheet = async (tikr) => await axios({
    url: `https://fmpcloud.io/api/v3/balance-sheet-statement/${tikr}?period=quarter&apikey=${fmpKey}`,
    method: 'get',
})

const getPastQuote = async (tikr, startDate, endDate) =>
  await axios({
    url: `https://fmpcloud.io/api/v3/historical-price-full/${tikr}?from=${startDate}&to=${endDate}&apikey=${fmpKey}`,
    method: 'get',
  });

const getQuote = async (tikr) =>await axios({
    url: `https://fmpcloud.io/api/v3/quote/${tikr}?apikey=${fmpKey}`,
    method: 'get',
})

module.exports = {getStockData, getBlnceSheet, getPastQuote, getQuote}