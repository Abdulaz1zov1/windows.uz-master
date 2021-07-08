const JWT = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    //Agar token topilmasa Avtorizatsiyadan o'tmaganlik haqida habar jo'natiladi
    if(!token){
        return res.status(401).json({ success: false, data: "No authorize to access this route" })
    }
    try{
        //  verify token
        const decoded = JWT.verify(token, config.JWT_SECRET)
        console.log(decoded)
        req.user = await User.findById(decoded.id)
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            data: "No authorize to access this route" // <= Abtorizatsiyadan o`tilmagan
        });
    }
};