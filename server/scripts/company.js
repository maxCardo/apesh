const {activeTickers} = require('./search')
const {getCompanyProf} = require('../services/fmp')

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

module.exports = {loadCompanies}

