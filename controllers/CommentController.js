const Comment = require('../models/Comment');
//const jwt = require('jsonwebtoken');

exports.createComment = async (req, res) => {
    //const user = jwt.decode(req.headers.authorization.slice(7));
    const Comment = new Comment({
        user: req.body.user, //user.id
        product: req.body.product,
        comment: req.body.comment,
        child: req.body.child
    })
    await Comment
        .save()
        .then(()=>{
            res.status(201).json({ success: true})
        })
        .catch((error)=>{
            res.send(error).json({ success: false, error})
        })
}

exports.getComments = async (req, res) => {
    const Comment = await Comment.find()
        .sort({date: -1})
        .populate(['user','product','child'])
    res.status(200).json({
        success: true,
        data: Comment
    })
}

exports.getComment = async (req, res) => {
    const Comment = await Comment.findOne({_id: req.params.id})
    if(!Comment) {
        res.status(404).json({
            success: false,
            data: 'Not Found'
        })
    }
    res.status(200).json({
        success: true,
        data: Comment
    })
}

exports.editComment = async (req, res) => {
    const Comment = await Comment.findByIdAndUpdate({_id: req.params.id})
    if(!Comment){
        res.status(404).json({
            success: false,
            data: 'Not Found'
        })
    }
    Comment.comment = req.body.comment
    await Comment.save()
        .then(()=>{
            res.status(200).json({
                success: true
            })
        })
        .catch((error)=>{
            res.send(error)
        })
}

exports.deleteComment = async (req, res) => {
    let Comment = await Comment.findByIdAndRemove({_id: req.params.id});
    if(!Comment){
        res.status(404).json({
            success: false,
            data: 'Not Found'
        })
    }
    res.status(200).json({
        success: true,
        data: Comment
    })
}





