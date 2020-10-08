const {getStockData, getBlnceSheet} = require('./server/services/fmp')


const test = async () => {

    const res = await getStockData('AAPL')
    console.log('test: ', res.data.slice(0,3))

    const balanceSheet = await getBlnceSheet('AAPL')
    console.log(balanceSheet.data.slice(0, 3));
}
test()