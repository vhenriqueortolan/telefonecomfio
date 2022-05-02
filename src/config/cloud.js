const cloudinary = require('cloudinary').v2
const { redirect } = require('express/lib/response');
const mongoose = require('mongoose');
const streamifier = require('streamifier')
require('../models/User')
const User = mongoose.model('user')
const {saveArt} = require('../controllers/new-art')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });
const toCloud = (req, res) => {
    if (!req.user){
        req.flash('error', 'Você precisa estar logado para enviar suas artes')
        res.redirect('/login')
    }
    else {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
        async function upload(req) {
            let result = await streamUpload(req);
            User.findOne({email: req.user.email}).then((user) => {
                if(user){
                    user.images.push(result.url)
                    user.save().then(saveArt(req, res, result))
                }
                else {
                    res.redirect('/login')
                }
            }).catch((err) => {
                console.log(err)
                req.flash('error', 'Houve um erro, tente novamente')
                res.redirect('/upload')
            })
        }
        upload(req);
    }
}

module.exports = toCloud