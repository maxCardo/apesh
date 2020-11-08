const dbConnect = require('./server/db/db');
const {singleLookup} = require('./server/scripts/stocks')
const {runFirstScan} = require('./server/scripts/scan')

dbConnect();

const runTest = () => {
  //runFirstScan()
  singleLookup('IDT')
}

runTest()



