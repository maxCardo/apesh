const { getTickers } = require('../rawData/script');
const Company = require('../db/models/company')
const {getCompanyProf} = require('../services/fmp')

//@desc: load csv tickers and return arr of tickers
const activeTickers = async () => {
  const tickers = await getTickers();
  const tickersArr = tickers.map(record => record.ticker)
  return tickersArr
};


const createRecordsFromCSV = async () => {
    const csvData = await activeTickers()
    csvData.forEach(async (record, i) => {
        await setTimeout(async () => {
            const profile = await getCompanyProf(record)
            let company
            if (!profile.length) {
                company = new Company({ticker: record})
            }else{
                const {symbol: ticker, companyName, exchangeShortName: exchange, sector, industry, website, description, fullTimeEmployees} = profile[0]
                company = new Company({
                    ticker, 
                    companyName, 
                    exchange, 
                    sector, 
                    industry,
                    website,
                    description,
                    fullTimeEmployees
                })
            }
            console.log('ok');
            //company.save()
        }, i * 1000)
    })
}

module.exports = {createRecordsFromCSV}