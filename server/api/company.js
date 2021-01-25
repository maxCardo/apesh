const express = require('express')
const { getCompanyNews, getHistoricalPriceData } = require('../services/fmp')

const router = express.Router()

// @route: GET api/company/details/:tkr
// @desc: get latist news on a company 
// @ access: public
router.get('/details/:tkr', async (req, res) => {
    try {
        const ticker = req.params.tkr
        const news = await getCompanyNews(ticker)
        const pricing = await  getHistoricalPriceData(ticker, 45)
        res.status(200).send({ticker, news, pricing: pricing.historical})

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})







module.exports = router


// @route:
// @desc: 
// @ access: public