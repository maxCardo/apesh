const express = require('express')
const {getQuote} = require('../services/fmp')
const Watchlist = require('../db/models/stratigy/watchlist')

const router = express.Router()

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find()
        const quote = await getQuote(watchlist.map(x => x.symbol).toString())
        const newList = await watchlist.map((item) => {
            const price = quote.find(elem => elem.symbol === item.symbol).price
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
// @desc: 
// @ access:
router.put('/removeItem/:id', async (req, res) => {
    console.log('running delete rt');
    console.log(req.params.id);
    const record = await Watchlist.findByIdAndDelete(req.params.id)
    res.status(200).send(record._id)    
})

// @route:
// @desc: 
// @ access:
router.put('/like/:id', async (req, res) => {
    console.log('running route for ', req.params.id);
    const record = await Watchlist.findByIdAndUpdate(req.params.id, {hot: true}, {new: true})
    console.log('record: ', record);
    res.status(200).send(record)
})


module.exports = router