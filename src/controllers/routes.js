const express = require("express")
const router = express.Router()
const register = require('./new-user')
const passport = require('passport')
const {auth} = require('../config/auth')
const {fileUpload} = require('../config/fileUpload')
const toCloud = require('../config/cloud')
const {myArts} = require('../config/my-arts')
const {gallery} = require('../config/gallery')

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

router.get('/registrar', function(req, res){
    res.render('pages/registro')
})

router.get('/login', function(req, res){
    res.render('pages/login')
})

router.get('/galeria', gallery)

router.get('/minhas-artes', auth, myArts)

router.get('/upload', auth, function(req, res){
    res.render('pages/upload')
})

router.post('/tocloud', fileUpload.single('file'), toCloud)

router.post('/confirm', register)

router.post('/auth', passport.authenticate('local', {successRedirect: '/minhas-artes', failureRedirect: '/login', failureFlash: true}), (req, res, next) => {
    next()
})

router.get('/sair', (req, res) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router
