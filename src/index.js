const express = require("express");
const session = require("express-session");
const flash = require('connect-flash')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')(passport)

//session config
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//global vars
app.use(flash())
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

// parser
app.use(express.urlencoded({extended: true}))

//connect mongoose
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongo DB conectado')
}).catch((err) => {
    console.log(err)
})

//ejs config
app.set('view engine', 'ejs')
app.set('views', 'src/views');

//public directory
app.use(express.static(__dirname + '/public/'))

//routers
const router = require('./controllers/routes.js');
app.use('/', router)

app.listen(process.env.PORT, () => console.log(`Server iniciou na porta ${process.env.PORT}`))


