const parse = require('csv-parse/lib/sync');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));


async function parseCsv(filePath) {
  const file = await fs.readFileAsync(filePath, { encoding: 'utf-8' });
  return parse(file, {
    columns: true,
    skip_empty_lines: true,
  });
}

//load list of tickers from csvs and combine
const getTickers = async () => {
    try {
        const nyse = await parseCsv('./server/rawData/NYSE_20201030.csv');
        const nasdaq = await parseCsv('./server/rawData/NASDAQ_20201030.csv');

        nasdaq.forEach(record => {
            record.exchange = 'nasdaq'
        })

        nyse.forEach((record) => {
          record.exchange = 'nyse';
        });

        let combined = [...nasdaq, ...nyse]

        return await combined
        
    } catch (err) {
        console.error(err);
    }
}

//load csv tickers onto db: Not complete
const loadTickers = async () => {
  const tickers = await getTickers();
  const arr = tickers.slice(0, 2);
  //const quote = await getStockData(tickers[0].ticker);

  console.log(tickers[0]);

  arr.forEach((record) => {
    try {
      const company = new Company({
        ticker: record.ticker,
        exchange: record.exchange,
      });
      company.save();
    } catch (err) {
      console.error(err);
    }
  });
  console.log('done');
};

module.exports = {getTickers}