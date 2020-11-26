const {getQuote, getPastQuote, getIdxQuote} = require('../services/fmp')
const Index = require('../db/models/marketIndex')
const mrktidx = require('../db/models/mrktidx')


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
                  dayLow: index.dayLow,
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

const historicalIndexRec = async () => {
    const indexs = await getPastQuote('^VIX, ^IXIC, ^NYA', '2019-01-01', '2020-11-26')
    //console.log(indexs.historicalStockList);
    const run = indexs.historicalStockList.map(async (index) => {
        let record
        record = await mrktidx.findOne({ ticker: index.symbol })
        if (!record) {
            record = new mrktidx({
                ticker: index.symbol,
                name: index.symbol
            });
        } 
        try {
            //console.log(index.historical);
            record.history = index.historical
        } catch (error) {
            console.error(error);
        }
        
        record.save();
    })
    //return `Ran record index on ${run.length} records`
}

const dailyIdxRec = async () => {
    const indexs = await getIdxQuote('^VIX, ^IXIC, ^NYA')
    //console.log(indexs.historicalStockList);
    const run = indexs.historicalStockList.map(async (index) => {
        let record
        record = await mrktidx.findOne({ ticker: index.symbol })
        if (!record) {
            record = new mrktidx({
                ticker: index.symbol,
                name: index.symbol
            });
        }
        const newRecord = index.historical[0]
        if (newRecord.date != record.history[0].date) {
            record.history.unshift(newRecord)
            console.log('new record for ', record.ticker);
        }else {
            console.log('else fired on record ' , record.ticker );
        }

        record.save();
    })
    return `Ran new record index on ${run.length} records`
}



module.exports = {dailyIndexesRec, dailyIdxRec}