const Market = require('../db/models/company')
const WatchItem = require('../db/models/stratigy/watchlist')
const Company = require('../db/models/company')
const {getPastQuote, getBlnceSheet, getStockData, getQuote} = require('../services/fmp');


const firstScan = async (searchArr, searchParams) => {
    const {name, upside} = searchParams    
    //ToDO: refactor below vars into search param. dynamic vars will be replaced with multible searches
    //static target vars
    const capPE = 14.5
    const upsideMin = upside
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

    //loop through array of records
    const ops = await searchArr.filter(async (record, i) => {
        setTimeout(async () => {
            //ToDO: if already on list dont run record ???
            //get external API data from fmp
            try {
                const kpi = await getStockData(record.symbol);
                const balanceSheet = await getBlnceSheet(record.symbol);
                const quote = await getQuote(record.symbol);

                //set vars from fmp data
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
                

                //save if company meets scan standard
                if (upsidePass  && debtPass) {
                    console.log('yes: ', record.symbol);
                    console.log('upside: ', upsidePass, 'debt: ', debtPass);
                    const watchItem = await addToWatchList(name, record.symbol, price, value)
                    return watchItem
                }else{
                    console.log('no', record.symbol);
                    console.log('upside: ', upsidePass, 'debt: ', debtPass);                 
                }
            } catch (err) {
                console.log('error fired on ', record.symbol);
                console.error(err);
            }
        }, i * 1000);
    });
    return ops
};

const shortScan = async (searchArr, searchParams) => {
    const { name, upside } = searchParams    
    //ToDO: refactor below vars into search param. dynamic vars will be replaced with multible searches
    //static target vars
    const capPE = 13
    const upsideMin = upside
    const debtMin = .5  //can be a search param
    //dynamic vars

    //loop through array of records
    const ops = await searchArr.map(async (record, i) => {
        setTimeout(async () => {
            //ToDO: if already on list dont run record ???
            //get external API data from fmp
            try {
                const kpi = await getStockData(record.symbol);
                const balanceSheet = await getBlnceSheet(record.symbol);
                const quote = await getQuote(record.symbol);

                //set vars from fmp data
                let growth = kpi.reduce((total, next) => total + next.roic, 0) / kpi.length;
                let peRatio = kpi.reduce((total, next) => total + next.peRatio, 0) / kpi.length;
                const eps = kpi[0].netIncomePerShare;
                const debt = balanceSheet[0].totalDebt;
                const cash = balanceSheet[0].cashAndCashEquivalents;
                const debtCoverage = cash / debt;
                const price = quote[0].price;

                console.log('price: ', price);
                console.log('eps', eps);
                console.log('PE Ratio: ', peRatio);
                console.log('Growth: ', growth);
                console.log(kpi.map(x => x.roic));
                console.log('Cash: ', cash);
                console.log('debt: ', debt);
                console.log('D/C Ratio: ', debtCoverage);

                //set adjusted vars based on static target vars
                const epsAdj = eps < 0 ? 0 : eps
                if (peRatio < capPE) {
                    peRatio = capPE;
                } else if (peRatio < 0) {
                    peRatio = capPE;
                }
                if (growth < 0) {
                    growth = 0;
                }

                console.log('Adj Growth: ', growth);
                console.log('Cap PE: ', capPE);
                console.log('adj pe: ', peRatio);
                console.log('adj eps: ', epsAdj);
                
                //set "intrinsic" value of stock
                const value = ((epsAdj * growth + epsAdj) * peRatio);
                console.log('value: ', value);
                console.log('--------------------------------------------------------------------------------------------------------------------');

                //set buy params
                var upside = (price - value) / value;
                var upsidePass;
                if (upside >= upsideMin) {
                    upsidePass = true;
                } else {
                    upsidePass = false;
                }
                var debtPass;
                if (debtCoverage <= debtMin) {
                    debtPass = true;
                } else {
                    debtPass = false;
                }
                

                //save if company meets scan standard
                if (upsidePass && debtPass && value > 1) {
                    //console.log('yes: ', record.symbol);
                    //console.log('upside: ', upsidePass, 'debt: ', debtPass);
                    const watchItem = await addToWatchList(name, record.symbol, price, value)
                    return watchItem

                } else {
                    console.log('no', record.symbol);
                    console.log('upside: ', upsidePass, 'debt: ', debtPass);
                    console.log('value: ', value);
                }
            } catch (err) {
                console.log('error fired on ', record.symbol);
                console.error(err);
            }
        }, i * 1000);
    });
    return ops
};

//@desc: add to scan lead list. "Watchlist will show only those that are liked "
const addToWatchList = async (list, symbol, price, value) => {
    const company = await Company.findOne({symbol: symbol})
    const watchItem = new WatchItem({
        list,
        symbol,
        company: company._id,
        priceWhenAdded: price,
        status: 'new',
        value: value,
        notes: [{
            type: 'log',
            content: `added to ${list}`
        }]
    })
    await watchItem.save()
    return watchItem
}

//@desc: clear watch list of aged leads that are not liked
const cleanWatchlist = () => {
    
}

//@desc: assessment similar to a scan but triggerd by upcoming reporting
const ReportingValueScan = async (searchArr) => {    

    //static target vars
    const capPE = 14.5 
    //dynamic vars
    const growthObj = { tier1: 0.09, tier2: 0.06, tier3: 0.03, tier4: 0.0 };
    const discountObj = {
        tier1: 0.1,
        tier2: 0.15,
        tier3: 0.25,
        tier4: 0.35,
    };

    //loop through array of records
    searchArr.forEach(async (co, i) => {
        setTimeout(async () => {
            try {
                const rec = await Company.findOne({symbol: co.symbol})
                if (rec) {
                    //Update reporting details on record
                    rec.nextReporting = {
                        date: co.date,
                        estEPS: co.epsEstimated,
                        estRev: co.revenueEstimated
                    }
                    //get external API data from fmp
                    const kpi = await getStockData(rec.symbol);
                    const balanceSheet = await getBlnceSheet(rec.symbol);
                    const quote = await getQuote(rec.symbol);

                    //update vars on record with fmp data
                    rec.growth = kpi.reduce((total, next) => total + next.roe, 0) / kpi.length;
                    //Note: above does not take into account divid. Expected growth is lower but val offset by the cash dist
                    rec.peRatio = kpi.reduce((total, next) => total + next.peRatio, 0) / kpi.length;
                    rec.eps = kpi[0].netIncomePerShare;
                    rec.debt = balanceSheet[0].totalDebt;
                    rec.cash = balanceSheet[0].cashAndCashEquivalents;
                    rec.cashDebtRatio = rec.cash / rec.debt;
                    rec.price = quote[0].price;

                    const valuation = {}

                    //set dynamic target vars
                    let debtCoverage = rec.cashDebtRatio
                    if (debtCoverage >= 1) {
                        valuation.growthCap = growthObj.tier1;
                        valuation.discount = discountObj.tier1;
                    } else if (debtCoverage < 1 && debtCoverage >= 0.75) {
                        valuation.growthCap = growthObj.tier2;
                        valuation.discount = discountObj.tier2;
                    } else if (debtCoverage < 0.75 && debtCoverage >= 0.5) {
                        valuation.growthCap = growthObj.tier3;
                        valuation.discount = discountObj.tier3;
                    } else {
                        valuation.growthCap = growthObj.tier4;
                        valuation.discount = discountObj.tier4;
                    }

                    //set adjusted vars based on static target vars
                    if (rec.peRatio > capPE) {
                        valuation.peRatio = capPE;
                    } else if (rec.peRatio < 0) {
                        valuation.peRatio = 0;
                    }else{
                        valuation.peRatio = rec.peRatio
                    }

                    // console.log('growth comp', rec.growth > valuation.growthCap);
                    // console.log(rec.growth);
                    // console.log(valuation.growthCap);
                    if (rec.growth > valuation.growthCap) {
                        valuation.growth = valuation.growthCap;
                    }else{
                        valuation.growth = rec.growth
                    }

                    //set "intrinsic" value of stock
                    valuation.futureValue = ((rec.eps * valuation.growth + rec.eps) * valuation.peRatio)  
                    valuation.currentValue = rec.eps * valuation.peRatio
                    valuation.buyTarget = valuation.futureValue / (1 + valuation.discount)
                    //valuation.upside = (valuation.value - rec.price) / rec.price;
                    rec.valuation.unshift(valuation)
                    rec.history.unshift({type: 'log', content: 'updated valuation on earnings trigger'})
                    const res = await rec.save()
                    console.log(`Updated record for ${res.symbol}`);
                }else{
                    console.log(`record not found for ${co.symbol} reporting ${co.date}`);  
                }
            } catch (err) {
                console.log('error fired on ', co.symbol);
                console.error(err);
            }
        }, i * 1000);
    });
};
    

module.exports = {firstScan, shortScan, ReportingValueScan}


