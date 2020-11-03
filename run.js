const dbConnect = require('./server/db/db');
const Company = require('./server/db/models/company');
const {getAll, getPastQuote} = require('./server/services/fmp');
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
  console.log(activeTkrsArr.length); 
  const {data: nasdaq} = await getAll('nasdaq');
  console.log(nasdaq.length);
  const {data: nyse} = await getAll('nyse');
  console.log(nyse.length);
  const market = [...nyse, ...nasdaq].filter(record => activeTkrsArr.includes(record.symbol) === true && record.price > 1 )

  const losers = market.sort((a,b) => a.changesPercentage - b.changesPercentage).slice(0,5)




  //------------------------------------------- copy over sheets script -----------------------------------------------//

  //static target vars
  const capPE = 14.5
  const covidCrashCap = .7
  const upsideMin = .5
  const debtMax = .5

  //loop through array of records
  losers.forEach((record) => {
    //ToDO: if already on list dont run record ???

    //get external API data from fmp
    const {debt,cash} = await getBalanceSheet(record.symbol)
    const preCovid = await getPastQuote(record.symbol)
    const kpi = await getKpi()
    const price = await getQuote()[0].close

    //set vars from fmp data
    let growth //average roic over last 3 years
    let peRatio //get PE ratio over last 3 years
    const eps //current eps
    const debtCoverage // = cash/debt

    //set dynamic target vars    
    let growthCap
    const growthObj = {tier1:.09,tier2:.06,tier3:.03,tier4:.0}
    let discount
    const discountObj = {tier1:.10,tier2:.15,tier3:.25,tier4:.35}
    if(debtCoverage >= 1){
      growthCap = growthObj.tier1
      discount = discountObj.tier1
    } else if(debtCoverage <1 && debtCoverage >=.75){
      growthCap = growthObj.tier2
      discount = discountObj.tier2
    }else if(debtCoverage <.75 && debtCoverage >=.5){
      growthCap = growthObj.tier3
      discount = discountObj.tier3
    }else{
      growthCap = growthObj.tier4
      discount = discountObj.tier4
    }

    //set adjusted vars based on static target vars
    if(peRatio > capPE){peRatio = capPE} else if (peRatio < 0){peRatio = 0}
    if(growth > growthCap){growth = growthCap}
    
    
    //set "intrinsic" value of stock
    const value = (((eps * growth) + eps)*peRatio)/(1+discount)

    //set buy params
    var upside = (value - price)/price
    var upsidePass
    if(upside >= upsideMin){upsidePass = true}else{upsidePass = false}
    var debtPass;
    if(debtCoverage >= debtMax){debtPass = true}else{debtPass = false}
    //compare value to pre crash levels
    var crashComp = preCovid/value
    var crashCompPass = false;
    if(crashComp > covidCrashCap){crashCompPass = true}else{crashCompPass = false}
    
    //print res
    if(upsidePass && crashCompPass && debtPass ){
      console.log('pass');
      console.log(record.symbol);
      console.log('upside:', upsidePass, 'debt: ', debtPass,'crash: ', crashPass);
    }else{
      console.log('pass');
      console.log(record.symbol);
      console.log('upside:', upsidePass, 'debt: ', debtPass,'crash: ', crashPass);
    }

  })
   
  





  //console.log('nasdaq: ', nasdaq.data.length)
  
  // const movers = await getTopMovers();
  // console.log('movers: ', movers.data.length)
  
  // const gainers = await getTopGainers();
  // console.log('gainers: ', gainers.data.length);

  // const losers = await getTopLosers();
  // console.log('losers: ', losers.data.length);

};
test()





module.exports = {getTickers}

