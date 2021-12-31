const express = require('express')
const {getQuote} = require('../services/fmp')
const {getValueReporting} = require('../scripts/reporting')
const Watchlist = require('../db/models/stratigy/watchlist')


const router = express.Router()

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find().populate('company')
        const quote = await getQuote(watchlist.map(x => x.symbol).toString())
        const newList = await watchlist.map((item) => {
            let itemQuote = quote.find(elem => elem.symbol === item.symbol)
            const price = itemQuote ? itemQuote.price : 0
            item.price = price
            return item
        })

        res.status(200).send(newList)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})

// @route:
// @desc: delete item from watchlist
// @ access: Public
router.put('/removeItem/:id', async (req, res) => {
    console.log('running delete rt');
    console.log(req.params.id);
    const record = await Watchlist.findByIdAndDelete(req.params.id)
    res.status(200).send(record._id)    
})

// @route:
// @desc: like watchlist item
// @ access: Public
router.put('/like/:id', async (req, res) => {
    console.log('running route for ', req.params.id);
    const record = await Watchlist.findByIdAndUpdate(req.params.id, {hot: true}, {new: true})
    console.log('record: ', record);
    res.status(200).send(record)
})

// @route: GET api/watchlist/reporting
// @desc: get this weeks upcoming reporting
// @ access: Public
router.get('/reporting', async (req, res) => {
    try {
        const data= await getValueReporting()
        console.log('data: ', data.length);
        const dataValue = data.filter(record => record.valuation[0].currentValue >= record.price)
        console.log('Data Value: ', dataValue.map(x => x.mentions));
        res.status(200).send(dataValue)
    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})

module.exports = router