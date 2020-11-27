const dbConnect = require('./server/db/db');
const watchList = require('./server/db/models/stratigy/watchlist');
const { runShortScan } = require('./server/scripts/scan');


dbConnect();

const runTest = async () => {
  console.log('running test');
  //runShortScan()
  const res = await watchList.find({list: 'first_short'})
  console.log(res);

}

runTest()



