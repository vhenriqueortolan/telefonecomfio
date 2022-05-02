const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('user')

module.exports = {
    myArts: (req, res) => {
        User.findOne({email: req.user.email}).then((user) => {
            const arts = user.images
            res.render('pages/minhas-artes', {arts: arts})
        }).catch((err) => {
            console.log(err)
        })
    }
}