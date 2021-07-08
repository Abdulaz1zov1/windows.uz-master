const mongoose=require('mongoose')

const NewsSchema=mongoose.Schema({
    title:{type:String, required:true},
    slug:{type:String,required:true, unique:true},
    image:{type:String, required:true},
    user_id:{type:String, required:true},
    description:{type:String, required: true },
    tag:[{type:String,required:true}],
    date:{type: Date, default: Date.now()}
})
module.exports=mongoose.model('News', NewsSchema)