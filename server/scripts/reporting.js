const dayjs = require('dayjs')

const Company = require('../db/models/company')
const {getEarningsCal} = require('../services/fmp')
const { createRecordsFromCSV } = require('./search')
const {ReportingValueScan} = require('../scripts/scan')

const startDate =  dayjs().add(7,'day').startOf('week').format('MM/DD/YYYY')
const endDate =  dayjs().add(7,'day').endOf('week').format('MM/DD/YYYY')


//@desc: get co's w/earnings sch in next 7 days and co rec
const getUpcomingEarnings = async () => {
    const data = await getEarningsCal()
    //filter for upcoming earnings
    const reporting = data.filter(rec => {
        const reportDate = dayjs(rec.date).format('MM/DD/YYYY')
        if (reportDate >= startDate && reportDate <= endDate) {
            return rec
        }
    })
    //scan for value and udate record in DB
    ReportingValueScan(reporting)
}

//@desc: db quary for UI to find top value co's with upcoming reporting dates
//ToDO: update daily price call to update upside if value is present
const getValueReporting = async () => {
    const records = await Company.find({'nextReporting.date':{$gte:startDate, $lte:endDate}})
    return records
}

//@desc: db quary for UI to find recent reported with value can include vol drivers as well as upside. 
const getValueReported = () => {
    
}

module.exports = {getUpcomingEarnings, getValueReporting}