const req = require('express/lib/request')
const mongoose = require('mongoose')
require('../models/Art')
const Art = mongoose.model('art')

module.exports = {
 saveArt: (req, res, result) => {
    const art = new Art({
    name: req.user.name,
    email: req.user.email,
    instagram: req.user.instagram,
    image: result.url
})

art.save().then(() => {
    req.flash('success', 'Sua arte foi cadastrada!')
    res.redirect('/minhas-artes')
}).catch((err) => {
    console.log(err)
    req.flash('error', 'Houve um erro, tente novamente')
    res.redirect('/upload')
})
}
}
