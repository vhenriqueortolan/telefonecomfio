const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        default: this.name
    },
    password: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('user', User)