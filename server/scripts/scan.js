const Market = require('../db/models/company')
const WatchItem = require('../db/models/stratigy/watchlist')
const {getPastQuote, getBlnceSheet, getStockData, getQuote} = require('../services/fmp');


const firstScan = async (searchArr, searchParams) => {
    
    //ToDO: refactor below vars into search param. dynamic vars will be replaced with multible searches
    //static target vars
    const capPE = 14.5
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
                    const watchItem = new WatchItem({
                        symbol: record.symbol,
                        list: 'first_scan',
                        status: 'new',
                        value: value,
                        notes: [{
                            type:'log',
                            content: 'first scan found this company' 
                        }]
                    })
                    await watchItem.save()
                    console.log('added on');
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

    //ToDO: refactor below vars into search param. dynamic vars will be replaced with multible searches
    //static target vars
    const capPE = 13
    const upsideMin = 0
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
                    const watchItem = new WatchItem({
                        list: 'first_short',
                        symbol: record.symbol,
                        status: 'new',
                        value: value,
                        notes: [{
                            type: 'log',
                            content: 'first scan found this company'
                        }]
                    })
                    await watchItem.save()
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
    

module.exports = {firstScan, shortScan}


