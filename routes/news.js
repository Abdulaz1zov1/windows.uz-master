const express=require('express')
const router=express.Router()
const { create,
        getNews,
        getNewsById,
        deleteNewsById,
        updateNewsById
}=require('../controllers/NewsController')
router.post('/add',create)
router.get('/all',getNews)
router.get('/:id',getNewsById)
router.delete('/:id',deleteNewsById)
router.put('/:id',updateNewsById)


module.exports=router