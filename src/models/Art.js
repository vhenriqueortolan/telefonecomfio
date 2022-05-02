const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Art = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    instagram: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('art', Art)