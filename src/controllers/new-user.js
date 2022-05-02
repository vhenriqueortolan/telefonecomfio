const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const register = function(req, res){
    console
    if (!req.body.name || typeof req.body.name == null || typeof req.body.name == undefined ){
        req.flash('error', 'Nome inválido, tente novamente')
        res.redirect('/registrar')
    }
    if (!req.body.email || typeof req.body.email == null || typeof req.body.email == undefined ) {
        req.flash('error', 'Email inválido, tente novamente')
        res.redirect('/registrar')
    }
    if (!req.body.password || typeof req.body.password == null || typeof req.body.password == undefined ){
        req.flash('error', 'Senha inválida, tente novamente')
        res.redirect('/registrar')
    }
    else {
        User.findOne({email: req.body.email}).then((user) => {
            if (user){
                req.flash('error', 'Esse usuário já foi cadastrado.')
                res.redirect('/registrar')
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    instagram: req.body.instagram,
                    password: req.body.password
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) {
                            req.flash('error', 'Houve erro no momento de salvar a senha')
                            res.redirect('/registrar')
                        }
                        else {
                            newUser.password = hash
                            newUser.save().then(() => {
                                console.log('Novo usuário cadastrado')
                                req.flash('success', 'Usuário cadastrado com sucesso!')
                                res.redirect('/minhas-artes')
                            }).catch((err) => {
                                console.log(err)
                                req.flash('error', 'Houve um erro no momento de salvar o usuário, tente novamente.')
                                res.redirect('/registrar')
                            })
                        }
                    })
                })
            }
        })
    }
}

module.exports = register