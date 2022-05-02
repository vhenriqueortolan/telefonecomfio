const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('../models/User')
const User = mongoose.model('user')

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}).then((user) => {
            if (!user) {
                return done(null, false, {message: 'O usuário ou a senha estão incorretos'})
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    return done(null, user)
                }
                else {
                    return done(null, false, {message: 'O usuário ou a senha estão incorretos'})
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}



