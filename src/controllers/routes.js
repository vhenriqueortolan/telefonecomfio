const express = require("express")
const app = express()
const path = require('path')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('pages/inicio')
})

router.get('/sobre', function(req,res) {
    res.render('pages/sobre')
})

module.exports = router