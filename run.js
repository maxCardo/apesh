const {getStockData} = require('./server/services/fmp')


const test = async () => {

    const res = await getStockData('AAPL')
    console.log('test: ', res.data[0]);
}
test()