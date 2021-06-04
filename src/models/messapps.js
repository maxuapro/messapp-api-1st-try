const mongoose = require('mongoose')

const messappSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('messapp', messappSchema)