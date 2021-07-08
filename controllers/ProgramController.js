const Program = require('../models/Programm')
exports.Game = async (req,res)=>{
    const ProgramController = await new Program({
        title:req.body.title,
        slug:req.body.slug,
        image:req.body.image,
        screens:req.body.screens,
        info: {
            year:req.body.year,
            version:req.body.version,
            developer:req.body.developer,
            lang:req.body.lang,
            bitrate:req.body.bitrate
        },
        sustem:req.body.sustem,
        description:req.body.description,
        file:req.body.file,
        author:req.body.author,
        category:req.body.category,
        view:req.body.view
    })
    ProgramController.save()
        .then(()=>{
            res.status(200).json({
                success:true,
                data:ProgramController
            })
        })
        .catch((error)=>{
            res.status(400).json({
                success:false,
                data: "User not found"
            })

        })
}

exports.getUsers = async (req,res)=>{
    const ProgramController = await Program.find()
        .sort({date: -1})
        .populate('categoryId')
    res.status(200).json({
        success:true,
        data:ProgramController
    })
}

exports.getById = async (req,res)=>{
    const ProgramController = await Program.findOne({_id: req.params.id})
    if(!ProgramController){
        res.status(404).json({
            success:false,
            data:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        data:ProgramController
    })
}

exports.editUser = async (req,res)=>{
    const ProgramController = await Program.findByIdAndUpdate({_id: req.params.id})
    if(!ProgramController){
        res.status(404).json({
            success:false,
            data: "User not found"
        })
    }
    ProgramController.title = req.body.title
    ProgramController.slug = req.body.slug
    ProgramController.image = req.body.image
    ProgramController.screens = req.body.screens
    ProgramController.info.year = req.body.year
    ProgramController.system = req.body.system
    ProgramController.description = req.body.description
    ProgramController.file = req.body.file
    ProgramController.author = req.body.author
    ProgramController.category = req.body.category
    ProgramController.view = req.body.view

    ProgramController.save()
        .then(()=>{
            res.status(200).json({
                success:true,
                data:ProgramController
            })
        })
        .catch((error)=>{
            res.send(error)
        })

}

exports.deleteUser = async (req,res)=>{
    await Program.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({
        success:true,
        data:[]
    })
}