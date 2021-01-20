const express = require('express')
const path = require('path');
const cors = require('cors');
const setUpCron = require('./trigger/_trigger')
const dbConnect = require('./db/db');
const {getStockData} = require('./services/fmp')

const app = express()
app.use(cors()); 
//Init middle ware. replaces bodyParser
app.use(express.json({extended:false}));

setUpCron()
dbConnect()

app.get('/test', (req, res) => {
    console.log('running test api call');
    res.status(200).send('got it')
})

app.use('/api/user', require ('./api/user'))
app.use('/api/watchlist', require('./api/watchlist'))
app.use('/api/company', require('./api/company'))

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        const file = path.join(__dirname + '/../client/build/index.html')
        res.sendFile(file);
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up on port ${port}`));

