const express = require("express")
const router = express.Router()

const {
    Game,
    getUsers,
    getById,
    editUser,
    deleteUser
} = require('../controllers/ProgramController')


router.post('/add',Game)
router.get('/all',getUsers)
router.get('/:id',getById)
router.put('/:id',editUser)
router.delete('/:id',deleteUser)

module.exports = router;