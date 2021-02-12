const express = require('express')
const Index = require('../db/models/marketIndex')

const router = express.Router()

// @route: GET api/market/idxs
// @desc: get all index data
// @ access: pulic - todo: make privite in future
router.get('/idxs', async (req, res) => {
    try {
        const indexes = await Index.find()
        res.status(200).send(indexes)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})


module.exports = router