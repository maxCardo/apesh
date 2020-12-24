const dbConnect = require('./server/db/db');
const WatchList = require('./server/db/models/stratigy/watchlist');
const { runShortScan } = require('./server/scripts/scan');
const {getQuote} = require('./server/services/fmp')


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
    const res = await WatchList.updateMany({}, {hot: false})
    console.log(res);
}

sandbox()



