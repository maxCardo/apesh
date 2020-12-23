const express = require('express')
const Watchlist = require('../db/models/stratigy/watchlist')

const router = express.Router()

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find()
        res.status(200).send(watchlist)
        
    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
    
})

module.exports = router