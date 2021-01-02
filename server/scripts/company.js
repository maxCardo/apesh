const moment = require('moment')
const {activeTickers} = require('./search')
const {getCompanyProf, getHistoricalPriceData, getCompanyNews} = require('../services/fmp') 
const Company = require('../db/models/company')


const loadCompanies = async () => {
    const tikrs = await (await activeTickers())
    tikrs.forEach((tkr, i) => {
        setTimeout(async () => {
            try {
                const profile = await getCompanyProf(tkr.symbol)
                const { symbol,companyName,exchange,exchangeShortName,sector,industry,website,description,ceo,fullTimeEmployees,image,} = profile[0]
                const company = new Company({
                    symbol,
                    companyName,
                    exchange,
                    exchangeShortName,
                    sector,
                    industry,
                    website,
                    description,
                    ceo,
                    fullTimeEmployees,
                    image,
                    lastEarnings: tkr.earningsAnnouncement,
                })
                company.history.push({type: 'log', content: 'created record on db'})
                await company.save()
                console.log(`success record ${i+1} of ${tikrs.length}`);
                
            } catch (err) {
                console.log('-------------------error loading ', tkr.symbol);
                console.error(err);
            }
        }, i * 1000)
    })
}


//supportFunctions
const arrAvg = arr => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
const arrMax = arr => Math.max(...arr);
const arrMin = arr => Math.min(...arr);
const arrSum = arr => arr.reduce((a, b) => a + b, 0)
const getStanDev = (array) => {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return (Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)).toFixed(3)
}
const getDataObj = (arr) => {
    const sumOfPrice = arrSum(arr.map(record => record.close))
    const sumOfVol = arrSum(arr.map(record => record.volume))

    const priceArr = []
    arr.forEach(({ open, high, low }) => {
        if (open === high | open === low) {
            priceArr.push(high, low)
        } else {
            priceArr.push(open, high, low)
        }
    })

    const obj = {
        price: arrAvg(arr.map((record) => { return (record.high + record.low) / 2 })),
        high: arrMax(arr.map(record => record.high)),
        low: arrMin(arr.map(record => record.high)),
        volume: arrAvg(arr.map(record => record.volume)),
        vwap: arrAvg(arr.map(record => record.vwap)),
        volatility: getStanDev(priceArr), 
        avgDayVolat: arrAvg(arr.map((record) => { return (record.high - record.low) / 2 })),
         
    }
    obj.volatPct = (obj.volatility/obj.price).toFixed(3)
    obj.avgDayValatPct = (obj.avgDayVolat/obj.price).toFixed(3)

    return obj
}

const marketDailyUpdate = async () => {
    const companies = await Company.find()
    companies.forEach(async   (company, i) => {
        setTimeout(async () => {
            console.log(`running update on record ${i+1} or ${companies.length} `);
            try {
                const { historical: data } = await getHistoricalPriceData(company.symbol)
                const lastRec = data[0]
                const volatility = arrAvg([lastRec.high - lastRec.low])
                company.lastClose = {
                    price: lastRec.close,
                    high: lastRec.high,
                    low: lastRec.low,
                    volume: lastRec.volume,
                    vwap: (lastRec.vwap).toFixed(2),
                    volatility,
                    volatPct: (volatility / arrAvg([lastRec.high, lastRec.low])).toFixed(3)
                }
                company.average_5 = getDataObj(data.slice(0, 5))
                company.average_10 = getDataObj(data.slice(0, 10))
                company.average_22 = getDataObj(data.slice(0, 22))
                company.data.dailyUpdate = { ran: true, success: true }

            } catch (err) {
                console.error(err);
                company.data.dailyUpdate = { ran: true, success: false }
            }
            try {
                const mentions = await getCompanyNews(company.symbol, 50, 30)
                company.mentions = {
                    last_24: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(1, 'd')).length,
                    last_7: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(7, 'd')).length,
                    last_15: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(15, 'd')).length,
                    last_30: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(30, 'd')).length
                }
                company.data.dailyNews = { ran: true, success: true }
            } catch (err) {
                console.error(err);
                company.data.dailyNews = { ran: true, success: false }
            }
            company.save()
        }, i * 500)
    })
}

const updateJustNews = async () => {
    const companies = await Company.find()
    companies.forEach(async (company, i) => {
        setTimeout(async () => {
            console.log(`running new update on record ${i + 1} or ${companies.length} `);
            try {
                const mentions = await getCompanyNews(company.symbol, 50, 30)
                company.mentions = {
                    last_24: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(1, 'd')).length,
                    last_7: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(7, 'd')).length,
                    last_15: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(15, 'd')).length,
                    last_30: mentions.filter(record => new Date(record.publishedDate) >= moment().subtract(30, 'd')).length
                }
                company.data.dailyNews = { ran: true, success: true }
            } catch (err) {
                console.error(err);
                company.data.dailyNews = { ran: true, success: false }
            }
            company.save()
        }, i * 500)
    })
}

module.exports = {loadCompanies, marketDailyUpdate, updateJustNews}

