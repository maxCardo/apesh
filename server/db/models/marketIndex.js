const mongoose = require('mongoose');

const indexSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    history:[{
        date: {
            type: Date,
            default: Date.now
        },
        previousClose: Number,
        open: Number,
        price: Number,
        dayLow: Number,
        dayHigh: Number,
        volume: Number,
        avgVolume: Number
    }]

});

module.exports = Chat = mongoose.model('Indexes', indexSchema);