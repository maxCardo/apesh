const {getStockData} = require('./server/services/fmp')


const test = async () => {

    const res = await getStockData('BA')
    console.log('test: ', res);
}
test()