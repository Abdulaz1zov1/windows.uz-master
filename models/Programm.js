const mongoose = require('mongoose')
const ProgramSchema = mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, trim: true,required: true, unique: true},
    image: {type: String, required: true},
    screens: [{type: String, required: true}],
    info:{
        year: {type: String, required: true},
        version: {type: String, required: true},
        developer: {type: String, required: true},
        lang: {type: String, enum: ['ru','en','duo'] , required: true},
        bitrate: {type: String, enum: ['x32','x64','duo']}
    },
    system: {type: String, required: true},
    description: {type: String, required: true},
    file:[{
        name: {type: String, required: true},
        link: {type: String, required: true}
    }],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    category: {type: mongoose.Schema.ObjectId, ref: 'Category', required: true},
    view: {type: Number},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('Program', ProgramSchema)