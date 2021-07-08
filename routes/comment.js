const express = require('express');
const router = express.Router();
const {
    createComment,
    getComments,
    getComment,
    editComment,
    deleteComment
} = require('../controllers/CommentController')

router.post('/add',createComment)
router.get('/all',getComments)
router.get('/:id',getComment)
router.put('/:id',editComment)
router.delete('/:id',deleteComment)


module.exports = router