const { getTickers } = require('../rawData/script');
const Company = require('../db/models/company')
const {getCompanyProf, getAll} = require('../services/fmp')
const {getPastQuote, getBlnceSheet, getStockData, getQuote} = require('../services/fmp');

//@desc: load csv tickers and return arr of tickers
const activeTickers = async () => {
  const tickers = await getTickers();
  const tickersArr = tickers.map(record => record.ticker)
  const nasdaq = await getAll('nasdaq');
  const nyse = await getAll('nyse');
  const market = [...nyse, ...nasdaq].filter(
    (record) =>
      tickersArr.includes(record.symbol) === true &&
      record.price > 2 &&
      record.price < 100
  );

  //const tickers = market.sort((a,b) => a.changesPercentage - b.changesPercentage).slice(0,200)
  //const searchP
  return market
};

//@desc: load csv tickers and return arr of tickers
const topGainers = async () => {
    const tickers = await getTickers();
    const tickersArr = tickers.map(record => record.ticker)
    const nasdaq = await getAll('nasdaq');
    const nyse = await getAll('nyse');
    const market = [...nyse, ...nasdaq].filter(
        (record) =>
            tickersArr.includes(record.symbol) === true &&
            record.price > 2 &&
            record.price < 100
    );

    const gainers = market.sort((a, b) => b.changesPercentage - a.changesPercentage).slice(0, 200)
    //const searchP
    return gainers
};

//@desc: load csv tickers and return arr of tickers
const topLosers = async () => {
    const tickers = await getTickers();
    const tickersArr = tickers.map(record => record.ticker)
    const nasdaq = await getAll('nasdaq');
    const nyse = await getAll('nyse');
    const market = [...nyse, ...nasdaq].filter(
        (record) =>
            tickersArr.includes(record.symbol) === true &&
            record.price > 2 &&
            record.price < 100
    );

    const losers = market.sort((a, b) => b.changesPercentage - a.changesPercentage).slice(0, 200)
    return losers
};


const createRecordsFromCSV = async () => {
    const csvData = await activeTickers()
    csvData.forEach(async (record, i) => {
        await setTimeout(async () => {
            const profile = await getCompanyProf(record)
            let company
            if (!profile.length) {
                company = new Company({ticker: record})
            }else{
                const {symbol: ticker, companyName, exchangeShortName: exchange, sector, industry, website, description, fullTimeEmployees} = profile[0]
                company = new Company({
                    ticker, 
                    companyName, 
                    exchange, 
                    sector, 
                    industry,
                    website,
                    description,
                    fullTimeEmployees
                })
            }
            console.log('ok');
            //company.save()
        }, i * 1000)
    })
}

const singleLookup = async (tikr) => {
    //ToDO: refactor below vars into search param. dynamic vars will be replaced with multible searches
    //static target vars
    const capPE = 14.5
    const covidCrashCap = .7  //can become search param
    const upsideMin = 0
    const debtMax = .5  //can be a search param
    //dynamic vars
    let growthCap;
    const growthObj = { tier1: 0.09, tier2: 0.06, tier3: 0.03, tier4: 0.0 };
    let discount;
    const discountObj = {
        tier1: 0.1,
        tier2: 0.15,
        tier3: 0.25,
        tier4: 0.35,
    };

    try {
        const kpi = await getStockData(tikr);
        const balanceSheet = await getBlnceSheet(tikr);
        const preC19 = await getPastQuote(tikr, '2020-2-20');
        const quote = await getQuote(tikr);

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
        console.log('price: ', price);
        console.log('value: ', value);
        console.log('debt:', debtCoverage)
        console.log('upside: ', upside);
        //compare value to pre crash levels
        var crashComp = preCovid / value;
        console.log(crashComp);
        var crashCompPass = false;
        if (crashComp > covidCrashCap) {
            crashCompPass = true;
        } else {
            crashCompPass = false;
        }

        //save if company meets scan standard
        if (upsidePass && crashCompPass && debtPass) {
            console.log('yes: ', tikr);
            console.log('upside: ', upsidePass, 'crashComp: ', crashCompPass, 'debt: ', debtPass);
            // const watchItem = new WatchItem({
            //     symbol: tikr,
            //     status: 'new',
            //     notes: [{
            //         type:'log',
            //         content: 'first scan found this company' 
            //     }]
            // })
            // await watchItem.save()
            
        }else{
            console.log('no', tikr);
            console.log('upside: ', upsidePass, 'crashComp: ', crashCompPass, 'debt: ', debtPass);                 
        }
    } catch (err) {
        console.log('error fired on ', tikr);
        console.error(err);
    }
    
}

module.exports = {createRecordsFromCSV, activeTickers, singleLookup, topGainers, topLosers}