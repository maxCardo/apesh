const dbConnect = require('./server/db/db');

const { runShortScan } = require('./server/scripts/scan');
const {getQuote} = require('./server/services/fmp')
const {loadCompanies} = require('./server/scripts/company')

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

    const rec = await WatchList.find({company: {$exists: false}}).countDocuments()
    console.log(rec);

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
}

//sandbox()



