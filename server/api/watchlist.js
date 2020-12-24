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


module.exports = router