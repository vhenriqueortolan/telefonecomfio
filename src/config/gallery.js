const mongoose = require('mongoose')
require('../models/Art')
const Art = mongoose.model('art')

module.exports = {
    gallery: async (req, res) => {
       const arts = []
       await Art.find({}).then((users) => {
            users.forEach((user) => {
                arts.push({user: user.name, instagram: user.instagram, art: user.image})
            })
            res.render('pages/galeria', {arts: arts})
        }).catch((err) => {
            console.log(err)
        })
    }
}