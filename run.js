const dbConnect = require('./server/db/db');
const Company = require('./server/db/models/company')
const {getStockData, getBlnceSheet} = require('./server/services/fmp')
const { fmpKey } = require('./server/config/creds');
const {getTickers} = require('./server/rawData/script')

dbConnect()


const test = async () => {

    const res = await getStockData('AAPL')
    console.log('test: ', res.data.slice(0,3))

    const balanceSheet = await getBlnceSheet('AAPL')
    console.log(balanceSheet.data.slice(0, 3));
}
//test()

const loadTickers = async() => {
    const tickers = await getTickers()
    const arr = tickers.slice(0,2)
    //const quote = await getStockData(tickers[0].ticker);

    console.log(tickers[0]);

    arr.forEach(record => {
    try {
        const company = new Company({
          ticker: record.ticker,
          exchange: record.exchange,
        });
        company.save();
    } catch (err) {
        console.error(err);
    }        
    })
    console.log('done');
}

loadTickers()