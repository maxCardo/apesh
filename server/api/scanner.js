const express = require('express')


const Company = require('../db/models/company')


const router = express.Router()

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.get('/', async (req, res) => {
    try {
        const list = await Company.find().limit(30)
        console.log('getting and sending compannies: ', list.length)
        res.status(200).send(list)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})

// @route: GET api/watchlist
// @desc: get items in watchlist
// @ access: pulic - todo: make privite in future
router.post('/filterOptions', async (req, res) => {
    try {
       const data = req.body
       const comboArr = Object.keys(data).map(async (x) => {
        const res = await Company.distinct(data[x].accessor, {[data[x].accessor] : {$nin: ['', null]}})
        return {key: x, value : res.map(option => ({label: option, value: option}))}
       })
       //convert to newsted object format used by component
       const returnObj = (await Promise.all(comboArr)).reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});
       res.status(200).send(returnObj)

    } catch (err) {
        console.error(err);
        res.status(500).send('err')
    }
})


module.exports = router