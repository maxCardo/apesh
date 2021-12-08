const dayjs = require('dayjs')

const Company = require('../db/models/company')
const {getEarningsCal} = require('../services/fmp')


//@desc: get co's w/earnings sch in next 7 days and co rec
const getUpcomingEarnings = async () => {
    const data = await getEarningsCal()
    const startDate =  dayjs().add(7,'day').startOf('week').format('MM/DD/YYYY')
    const endDate =  dayjs().add(7,'day').endOf('week').format('MM/DD/YYYY')

    const reporting = data.filter(rec => {
        const reportDate = dayjs(rec.date).format('MM/DD/YYYY')
        if (reportDate >= startDate && reportDate <= endDate) {
            return rec
        }
    })

    console.log(data.length);
    console.log(reporting.length);
    //scan for value
    //update company record
}

//@desc: db quary for UI to find top value co's with upcoming reporting dates
//ToDO: update daily price call to update upside if value is present
const getValueReporting = (params) => {
    
}

//@desc: db quary for UI to find recent reported with value can include vol drivers as well as upside. 
const getValueReported = () => {
    
}

module.exports = {getUpcomingEarnings}