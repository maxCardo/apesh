const moment = require('moment')
const dbConnect = require('./server/db/db');

const {getQuote, getCompanyNews, getEarningsCal, getEarningsRes, getBlnceSheet} = require('./server/services/fmp')
const {marketDailyUpdate} = require('./server/scripts/company')
const {loadAllCompanies, updateKPIData} = require('./server/scripts/company')
const {getUpcomingEarnings, getValueReporting } = require('./server/scripts/reporting')

const WatchList = require('./server/db/models/stratigy/watchlist');
const Company = require('./server/db/models/company')
const Index = require('./server/db/models/marketIndex')

dbConnect();

// const runTest = async () => {
//   console.log('running test');
//   //runShortScan()
//   const res = await watchList.find({list: 'first_short'})
//   console.log(res);

// }

// runTest()

const testingApi = () => {
  
}

const sandbox = async() => {

    // const rec = await WatchList.find({company: {$exists: false}}).countDocuments()
    // console.log(rec);

    // const watchlist = await WatchList.find()
    // watchlist.forEach(async (item, i) => {
    //     try {
    //         const company = await Company.findOne({ symbol: item.symbol })
    //         item.company = company._id
    //         await item.save()
    //         console.log(`update record ${i + 1} of ${watchlist.length}`)    
    //     } catch (err) {
    //         console.log(`update record ${i + 1} of ${watchlist.length}`);
    //         console.error(err);    
    //     }
    // })

    //get news on ticker props tickr record limit (default 25), num days back to search (default 30)  
    // const res = await getCompanyNews('AAPL',100,30)
    // const day = moment().subtract(1, 'd')
    // const week = moment().subtract(7, 'days')
    // const bWeek = moment().subtract(15, 'd')
    // const month = moment().subtract(30, 'd')
    // console.log(day < new Date());

    // console.log(res.length);
    // const last24 = res.filter(record => new Date(record.publishedDate) >= moment().subtract(1, 'd'))
    // const lastWeek = res.filter(record => new Date(record.publishedDate) >= moment().subtract(7, 'd'))
    // const last2Week = res.filter(record => new Date(record.publishedDate) >= moment().subtract(15, 'd'))
    // const lastMonth = res.filter(record => new Date(record.publishedDate) >= moment().subtract(30, 'd'))
    // console.log('last24: ', last24.length);
    // console.log('last24: ', lastWeek.length);
    // console.log('last24: ', last2Week.length);
    // console.log('last24: ', lastMonth.length);

    //marketDailyUpdate()

    //const res = await getEarningsRes('FLY')

    //console.log(res);
    //loadAllCompanies()

    //const res = await Company.find({symbol: 'FLY'})
    //console.log(res);

    // const balanceSheet = await getBlnceSheet('FLY')

    // const debt = balanceSheet[5].totalDebt;
    // const cash = balanceSheet[5].cashAndCashEquivalents;
    // const debtCoverage = cash / debt;

    // console.log('cash: ', cash);
    // console.log('debt: ', debt);
    // console.log(debtCoverage);

    //const companies = await Company.find({ 'data.bs.success': true })
    //updateKPIData(companies)


    // const indexs = await Index.find()

    // indexs.forEach(async (idx) => {
    //     console.log(idx.history[0]);
    //     //const history = idx.history.reverse()
    //     //idx.history = history

    //     //await idx.save()
    //     //console.log('new: ',idx.history[0]);
    // })

    //search watchlist for records that are not liked and greater then 3 days old
    //const today = moment().subtract(21,'days').format('MM/DD/YYYY')
    //console.log('date: ', today);
    //const watchlist = await WatchList.deleteMany({$and: [{'dateAdded': {$lt: today }}, {hot: false}]})
    //const watchlist = await WatchList.find()
    //console.log(watchlist.length);


    //run upcoming earnings
    getUpcomingEarnings()
    // const record = await getValueReporting()
    // console.log(record);
    // const test = await Company.find({symbol: 'PDPTF'})
    // console.log('test: ', test);
    // record.forEach(co => {
    //     console.log(`Running update for ${co.symbol} reporting ${co.date}`);
    // });

}

sandbox()



