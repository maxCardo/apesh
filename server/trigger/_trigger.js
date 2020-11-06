const cron = require('node-cron')
const {getQuote} = require('../services/fmp')
const Index = require('../db/models/marketIndex')


function setUpCron(){
  console.log('cron running')

  // @sch: Daily Sun - Sat 5:30am EST 10am UST;
  // @desc: 
  cron.schedule('30 10 * * *', async () => {
    const indexs = await getQuote('^VIX, ^IXIC, ^NYA')
    indexs.forEach(async (index) => {
        const record = await Index.find({ ticker: index.symbol })
        if (!record.length) {
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
  });

}

module.exports = setUpCron
