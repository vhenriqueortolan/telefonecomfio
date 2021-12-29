const express = require("express")
const router = express.Router()

router.get('/', function(req, res) {
    res.render('pages/inicio')
})

router.get('/sobre', function(req, res) {
    res.render('pages/sobre')
})

router.get('/como-ajudar', function(req, res){
    res.render('pages/como-ajudar')
})

router.get('/contato', function(req, res){
    res.render('pages/contato')
})

module.exports = router
