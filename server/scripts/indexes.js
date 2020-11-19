const {getQuote} = require('../services/fmp')
const Index = require('../db/models/marketIndex')


const dailyIndexesRec = async () => {
    const indexs = await getQuote('^VIX, ^IXIC, ^NYA')
    const run = indexs.map(async (index) => {
        const record = await Index.findOne({ ticker: index.symbol })
        if (!record) {
            const newRecord = new Index({
              ticker: index.symbol,
              name: index.name,
              history: [{
                  previousClose: index.previousClose,
                  open: index.open,
                  price: index.price,
                  dayLow: index.day,
                  dayHigh: index.dayHigh,
                  volume: index.volume,
                  avgVolume: index.avgVolume,
                }]
            });
            newRecord.save()        
        }else{
            record.history.push({
              previousClose: index.previousClose,
              open: index.open,
              price: index.price,
              dayLow: index.day,
              dayHigh: index.dayHigh,
              volume: index.volume,
              avgVolume: index.avgVolume,
            });
            record.save();
        }
    })
    return `Ran record index on ${run.length} records`
}

module.exports = {dailyIndexesRec}