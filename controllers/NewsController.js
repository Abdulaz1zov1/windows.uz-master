const News=require('../models/News')
const slug=require('slug')
//CRUD
exports.create=async (req,res)=>{
    const news=await new News({
        title:req.body.title,
        slug: slug((Math.floor(Math.random()*10000000)).toString()),
        image:req.body.image,
        user_id:req.body.user_id,
        tag:req.body.tag,
        description:req.body.description


    })
    news.save()
        .then(()=>{
            res.status(200).json({
                success:true,
                data:news

            })
        })
        .catch((error)=>{
            res.status(400).json({
                success:false,
                error
            })
        })
}
exports.getNews=async (req,res)=>{
    const news=await News.find()
        .sort({data:-1})
        // .populate('user_id')
        .limit(5)
        .select(['name','image','date'])
        res.status(200).json({
            success:true,
            data:news
        })
}
exports.getNewsById=async (req,res)=>{
    const news=await News.findById({_id: req.params.id})
        res.status(200).json({
        success: true,
        data:news
    })

}
exports.deleteNewsById=async (req,res)=>{
    const news=await News.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({
        success:true,
        data:[]
    })
}
exports.updateNewsById=async (req,res)=>{
    const news=await News.findByIdAndUpdate({_id: req.params.id})
    news.title=req.body.title
    news.image=req.body.image
    news.user_id=req.body.user_id
    news.tag=req.body.tag
    news.description=req.body.description


    news.save()
        .then(()=>{
            res.status(200).json({
                success:true,
            })

        })
        .catch((error)=>{
            res.status(400).json({
                success: false,
                error
            })
        })

}
