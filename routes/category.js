const express = require('express');
const router = express.Router();

const {
    category_POST,
    category_Get_All,
    category_Get_By_Id,
    category_Edit_By_Id,
    category_Delete_By_Id
} = require('../controllers/CategoryController')

router.post('/add', category_POST );
router.get('/all', category_Get_All );
router.get('/:id', category_Get_By_Id );
router.put('/:id', category_Edit_By_Id );
router.delete('/:id', category_Delete_By_Id );

module.exports = router
