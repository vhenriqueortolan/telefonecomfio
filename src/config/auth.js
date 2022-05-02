module.exports = {
    auth: (req, res, next) => {
        if (!req.isAuthenticated()){
            res.redirect('/login')
        }
        return next() 
    }
}