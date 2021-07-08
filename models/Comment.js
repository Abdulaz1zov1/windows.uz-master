const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Program',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    child: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment',CommentSchema)
