const express = require('express')
const {parse} = require('json2csv')


const Company = require('../db/models/company')
const TkrFilter = require('../db/models/tkerFilter')


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

//restructure  to functions to seperate script file. should be reusable to differt data models
function createFilter(data, filterName) {
    console.log('data in create:', data)
    //should not need this conditional statment ???
    if(filterName === 'listAge') {
      const dateOne = new Date();
      dateOne.setDate(dateOne.getDate() - +data[filterName].value)
      let dateTwo = undefined
      if(data[filterName].secondValue) {
        dateTwo = new Date();
        dateTwo.setDate(dateTwo.getDate() - data[filterName].secondValue)
      }
      const transposeFilterType = {
        'range': 'range',
        '==': '==',
        '!=': '!=',
        '>': '<',
        '>=': '<=',
        '<': '>',
        '<=': '>='
      }
      const operatorPerFilterType = {
        'range': ['$lte', '$gte'],
        '==': '$eq',
        '!=': '$ne',
        '>': '$gt',
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte'
      }
      const filterType = transposeFilterType[data[filterName].type.value]
      const operator = operatorPerFilterType[filterType]
      return {
        field: 'listDate',
        filterType: filterType,
        operator: operator,
        value: dateOne,
        secondValue: data[filterName].secondValue ? dateTwo : ''
      }
    } else {
      //reformats and returns data model  
      return {
        field: data[filterName].accessor,
        subField: data[filterName].subAccessor,
        filterType: data[filterName].type.value,
        operator: data[filterName].type.operator,
        value: typeof (data[filterName].value) === 'string' ? data[filterName].value : data[filterName].value.map((y) => y.value),
        secondValue: data[filterName].secondValue ? data[filterName].secondValue : ''
      }
    }
}

function convertFiltersToQuery(filters) {
    //create string query 
    const queryObj = {}
    filters.map((x) => {
        if (x.filterType === 'range') {
            Object.assign(queryObj, {
                [x.field]: { [x.operator[0]]: x.value, [x.operator[1]]: x.secondValue }
            })
        } else {
            Object.assign(queryObj, { [x.field]: { [x.operator]: x.value } })
        }
    })
    return queryObj
  }

// @route: GET /api/scanner/loadFilter
// @desc: load a new filter or selected saved filter (pageSize functionality is not currently being utilized by the front end)
// @ access: Public * ToDo: update to make private
router.post('/loadFilter', async (req, res) => {
    try {
        //const PAGESIZE = req.body.pageSize;
        //console.log('PAGESIZE: ',PAGESIZE, req.body.page);
        const data = req.body.filters
        let filters = []
        console.log('data: ', data)

        if(data.length) {
            console.log('if running')
          filters = data
        } else {
            console.log('else running')
          const filterFields = Object.keys(req.body.filters);
          //create filter object
          filterFields.forEach((x) => {
              if(data[x].type.value !== 'noFilter') {
                filters.push(createFilter(data,x))
              }
          })
        }

        console.log('filterArr', filters)
  
        
        //create string query 
        const queryObj = convertFiltersToQuery(filters)

        console.log('query object:', queryObj)

        // //query DB
        let record = await Company.find(queryObj)

        //if we make resuable how can we use populate????

        //ToDo: can incorperate page size on table component at a future data
        // let record;
        // if (req.body.page) {
        //     if(PAGESIZE) {
        //       console.log('if fired on 168');
        //       record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }}).skip(PAGESIZE * (+req.body.page)).limit(PAGESIZE + 1)
        //     } else {
        //       console.log('if fired on 171');
        //       record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' } })
        //     }
        // } else {
        //     record = await SalesListings.find(queryObj).populate({ path: 'compReport', populate: { path: 'comps.listing_id' }})
        //     console.log('line 176: ', record.length);
        // }
        
        // let hasMore = false;
        // if (record.length > PAGESIZE) {
        //     hasMore = true;
        //     record.pop()
        // }
  
        //handle blacklist on front end ???
        
        const blacklist = req.body.blacklist
        //console.log('blacklist: ', blacklist)
        if(blacklist) {
          record = record.filter((listing) => !blacklist.includes(listing._id.toString()))
        }

        //res.status(200).send({ record, filters, hasMore });
        res.status(200).send({ record, filters});

  
    } catch (error) {
        console.error(error);
        res.status(400).send('server error')
    }
});

// @route: post /api/marketPlace/ops/filters
// @desc: save new filter selected
// @ access: Public 
router.post('/saveFilter', async (req, res) => {
  const {name, filter} = req.body
  const tkrFilter = new TkrFilter({name, filters: filter})
  const data = await tkrFilter.save()
  console.log('saved filter: ', data)
  res.send({label: data.name, _id: data._id})
})

// @route: get /api/marketPlace/ops/filters
// @desc: get saved filters when component loads
// @ access: Public 
router.get('/savedFilters', async (req, res) => {
  console.log('running saved filters in backend')
  const filters = await TkrFilter.find({})
  const data = filters.map((filter) => ({
    label: filter.name,
    value: {filters: filter.filters, _id: filter._id, blacklist: filter.blacklist}
  }))

  console.log(data)
  res.send(data)
})

// @route: get /api/scanner/blacklist
// @desc: blacklist record from saved filter
// @ access: Public 
router.put('/blacklist', async (req, res) => {
  const {filter_id, item_id} = req.body
  const savedFilter = await TkrFilter.findById(filter_id)
  savedFilter.blacklist.push(item_id)
  const rec = await savedFilter.save()
  res.status(200).send(rec)
})

// @route: post /api/marketPlace/ops/filters
// @desc: save new filter selected
// @ access: Public 
router.post('/exportCSV', async (req, res) => {
  const data = req.body
  const csv = parse(data)
  res.status(200).send(csv)
})


module.exports = router