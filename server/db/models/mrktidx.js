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
    history: Array

});

module.exports  = mongoose.model('Market_IDX', indexSchema);