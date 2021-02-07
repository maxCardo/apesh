const moment = require('moment')
const dbConnect = require('./server/db/db');

const {getQuote, getCompanyNews, getEarningsCal, getEarningsRes} = require('./server/services/fmp')
const {marketDailyUpdate} = require('./server/scripts/company')
const {loadAllCompanies} = require('./server/scripts/company')

const WatchList = require('./server/db/models/stratigy/watchlist');
const Company = require('./server/db/models/company')

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

    const res = await Company.find({symbol: 'AAPL'})
    console.log(res);

}

sandbox()



