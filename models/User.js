const mongoose = require('mongoose')
const crypto = require('crypto')

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin','moderator','user'], default: 'user'},
    avatar: {type: String},
    rating: {type: Number, default: 0},
    info:{type: String},

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// Parolni generatsiya qilish ba heshlash
UserSchema.methods.getResetPasswordToken = () => {
    // Parolni generatsiya qilish
    const resetToken =  crypto.randomBytes(20).toString('hex')
    //Parolni heshlash
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    // Userning pochtasiga jo'natilgan parolning saqlanish muddati
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken
}



module.exports = mongoose.model('User',UserSchema)