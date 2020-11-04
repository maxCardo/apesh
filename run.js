const dbConnect = require('./server/db/db');
const Company = require('./server/db/models/company');
const { getAll, getPastQuote, getBlnceSheet, getStockData, getQuote} = require('./server/services/fmp');
const { fmpKey } = require('./server/config/creds');
const { getTickers } = require('./server/rawData/script');

//dbConnect();

//load csv tickers and return arr of tickers
const activeTickers = async () => {
  const tickers = await getTickers();
  const tickersArr = tickers.map(record => record.ticker)
  return tickersArr
};

const test = async () => {

  const activeTkrsArr = await activeTickers()
  const nasdaq = await getAll('nasdaq');
  const nyse = await getAll('nyse');
  const market = [...nyse, ...nasdaq].filter(record => activeTkrsArr.includes(record.symbol) === true && record.price > 1 )

  const losers = market.sort((a,b) => a.changesPercentage - b.changesPercentage).slice(0,15)




  //------------------------------------------- copy over sheets script -----------------------------------------------//

  //static target vars
  const capPE = 14.5
  const covidCrashCap = .7
  const upsideMin = .5
  const debtMax = .5

  //loop through array of records
  losers.forEach(async (record, i) => {
    await setTimeout(async () => {
      //ToDO: if already on list dont run record ???
      //get external API data from fmp
      try {
       const kpi = await getStockData(record.symbol);
       const balanceSheet = await getBlnceSheet(record.symbol);
       const preC19 = await getPastQuote(record.symbol, '2020-2-20');
       const quote = await getQuote(record.symbol);

       //set vars from fmp data
       let preCovid = preC19.historical[0].close
       let growth = kpi.reduce((total, next) => total + next.roic, 0) / kpi.length;
       let peRatio = kpi.reduce((total, next) => total + next.peRatio, 0) / kpi.length;
       const eps = kpi[0].netIncomePerShare;
       const debt = balanceSheet[0].totalDebt;
       const cash = balanceSheet[0].cashAndCashEquivalents;
       const debtCoverage = cash / debt;
       const price = quote[0].price;

       //set dynamic target vars
       let growthCap;
       const growthObj = { tier1: 0.09, tier2: 0.06, tier3: 0.03, tier4: 0.0 };
       let discount;
       const discountObj = {
         tier1: 0.1,
         tier2: 0.15,
         tier3: 0.25,
         tier4: 0.35,
       };
       if (debtCoverage >= 1) {
         growthCap = growthObj.tier1;
         discount = discountObj.tier1;
       } else if (debtCoverage < 1 && debtCoverage >= 0.75) {
         growthCap = growthObj.tier2;
         discount = discountObj.tier2;
       } else if (debtCoverage < 0.75 && debtCoverage >= 0.5) {
         growthCap = growthObj.tier3;
         discount = discountObj.tier3;
       } else {
         growthCap = growthObj.tier4;
         discount = discountObj.tier4;
       }

       //set adjusted vars based on static target vars
       if (peRatio > capPE) {
         peRatio = capPE;
       } else if (peRatio < 0) {
         peRatio = 0;
       }
       if (growth > growthCap) {
         growth = growthCap;
       }

       //set "intrinsic" value of stock
       console.log('eps: ', eps);
       console.log('growth: ', growth);
       console.log('PE: ', peRatio);
       console.log('discount: ', discount);
       const value = ((eps * growth + eps) * peRatio) / (1 + discount);

       //set buy params
       var upside = (value - price) / price;
       var upsidePass;
       if (upside >= upsideMin) {
         upsidePass = true;
       } else {
         upsidePass = false;
       }
       var debtPass;
       if (debtCoverage >= debtMax) {
         debtPass = true;
       } else {
         debtPass = false;
       }
       console.log('preCovid: ',preCovid);
       console.log('value: ', value);
       //compare value to pre crash levels
       var crashComp = preCovid/ value;
       console.log(crashComp);
       var crashCompPass = false;
       if (crashComp > covidCrashCap) {
         crashCompPass = true;
       } else {
         crashCompPass = false;
       }

       //print res
       if (upsidePass && crashCompPass && debtPass) {
         console.log(record.symbol);
         console.log('pass');
         console.log(' upside:', upsidePass, ' debt:', debtPass, ' crash:', crashCompPass);
       } else {
         console.log(record.symbol);
         console.log('fail');
         console.log(' upside:', upsidePass, ' debt:', debtPass, ' crash:', crashCompPass );
       } 
      } catch (err) {
        console.log('error fired on ', record.symbol);
      }
    }, i* 1000);
  });  
};
test()

module.exports = {getTickers}

