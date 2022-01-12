const express = require('express')


const Company = require('../db/models/company')


const router = express.Router()

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/', async (req, res) => {
    try {
        const list = Company.find().limit(10)
        console.log('getting and sending compannies: ', list.length)
        res.status(200).send(list)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})


module.exports = router