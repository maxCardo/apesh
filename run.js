const dbConnect = require('./server/db/db');
const {singleLookup} = require('./server/scripts/stocks')
const {runFirstScan} = require('./server/scripts/scan')
const {postDiscord} = require('./server/services/discord');
const { dailyIdxRec } = require('./server/scripts/indexes');
 

dbConnect();

const runTest = () => {
  console.log('running test');
  //runFirstScan()
  //singleLookup('IDT')  
  //dailyIdxRec()
}

runTest()



