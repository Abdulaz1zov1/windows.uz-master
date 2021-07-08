const mongoose = require('mongoose')

const CatgorySchema = mongoose.Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true, trim: true},
    children:{type: String},
    date: {type: Date, default: Date.now()}
})
module.exports = mongoose.model('Category',CatgorySchema)