const express = require("express")
const router = express.Router()
const register = require('./new-user')
const passport = require('passport')
const {auth} = require('../config/auth')
const multer = require('multer')
const fileUpload = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    }})
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

router.get('/upload', function(req, res){
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
