const sendEmail = require('../utils/sendEmail')
const User = require('../models/User')
const bcrypt = require('bcrypt')
// const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//-------------------------------------------------------------------------------------------------------------------
// ==========================  C R U D methods  =================
/**
 function: Register User
 url: /api/user/register
 type: Public
 method: POST
 **/
exports.register = async (req,res) =>{
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(req.body.password , salt);
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: password,
        role: req.body.role,
        avartar: req.body.avatar,
        rating: req.body.rating,
        info: req.body.info
    })
    await user.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: user
            })
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error
            })
        })
}

/**
 function: Login User
 url: /api/user/login
 type: Public
 method: POST
 **/
exports.login = async (req,res)=>{
    await User.findOne({email: req.body.email} , (error,user)=>{
        if(error){
            res.send(error)
        }else{
            if(!user){
                res.status(404).json({
                    success: false,
                    data: 'User not found'
                })
            }else{
                if(!bcrypt.compareSync(req.body.password , user.password)){
                    res.status(401).json({
                        success: false,
                        data: 'Invalid password'
                    })
                }else{
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, config.JWT_SECRET)
                    res.status(200).json({
                        token
                    })
                }
            }
        }
    })
}

/**
 function: Get All User
 url: /api/user/all
 type: Private
 method: GET
 **/
exports.userGetAll = async(req,res) =>{
    const user = await User.find()
        .sort({ date: -1})
    res.status(200).json({
        success: true,
        data: user
    })
}
/**
 function: Get User By Id
 url: /api/user/:id/
 type: Private
 method: GET
 **/
exports.userGetById = async(req,res) =>{
    const user = await User.findOne({_id: req.params.id})
    if(!user){
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
}
/**
 function: Edit User By Id
 url: /api/user/:id/
 type: Private
 method: PUT
 **/

exports.userEditById = async(req,res) => {
    const user = await User.findByIdAndUpdate({_id: req.params.id});
    if (!user) {
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    user.avartar =  req.body.avatar;
    user.rating =  req.body.rating;
    user.info =  req.body.info;

    await user.save()
        .then(() => {
            res.status(200).json({
                success: true,
                data: user
            })
        })
        .catch((error) => {
            res.send(error)
        })
}

/**
 function: Delete User By Id
 url: /api/user/all
 type: Private
 method: DELETE
 **/
exports.userDeleteById = async(req,res) =>{
    await User.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({
        success: true,
        data: []
    })
}
//-------------------------------------------------------------------------------------------------------------------
/**
 function: Get ME
 url: /api/user/profile
 type: Private
 method: GET
 **/
exports.getMe = async (req,res)=>{
    const token = req.headers.authorization
    const user =  jwt.decode(token.slice(7,token.length))
    const me = await User.findOne({_id: user.subject})
        .select({password: 0})
    res.send(me)
}


/**
 function: Forget Password
 url: /api/user/forget
 type: Private
 method: POST
 **/

exports.forgetPassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(!user){
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    console.log(`This is ResetToken: ${resetToken}`) // consolega o`zgartirilgan 40 ta sonli tokenni chiqarib beradi

    await user.save({ validateBeforeSave: false})

    //create reset url
    const resetURL = `http://localhost:3000/api/user/resetpassword/${resetToken}`
    // -----------------------------

    const msg = {
        to: req.body.email,
        subject: 'Parolni tiklash manzili',
        text: `Parolini tiklash uchun bosing ${resetURL}`
        // ${ 40ta sonli resetToken keldi }
    }
    try{
        await sendEmail(msg)
        res.status(200).json({
            success: true,
            data: 'Email sent'
        });
    }catch(err){
        console.log(err)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false})

        res.status(500).json({
            success: false,
            data: 'Email could not be sent'
        })
    }
}
/**
 function: Reset Password
 url: /api/user/resetpassword/:resettoken
 type: PUBLIC
 method: PUT
 **/
exports.resetPassword = async (req, res) => {
    // Yangi parol hashlandi
    const salt = await bcrypt.genSaltSync(12);
    const newHashedPassword = await bcrypt.hashSync(req.body.password, salt);


    // token password olish
    const user = await User.findOneAndUpdate({

        resetPasswordToken: req.params.resettoken
    });
    //foydalanuvchi topilmasa xatolik berish
    if(!user){
        res.status(400).json({
            success: false,
            data: 'Invalid token'
        })
    }
    //Yangi parolni o'rnatish [heshlangan tarzda chiqadi]
    user.password = newHashedPassword

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    // YAngi parolni saqlash
    await user.save()

    res.status(200).json({
        success: true,
        date: user
    })
}