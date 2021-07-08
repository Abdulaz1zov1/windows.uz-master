const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/add', UserController.register)
router.post('/login', UserController.login)
router.get('/all', UserController.userGetAll)
router.get('/:id', UserController.userGetById)
router.put('/:id', UserController.userEditById)
router.delete('/:id', UserController.userDeleteById)
router.get('/profile', UserController.getMe)
router.post('/forgetpassword', UserController.forgetPassword)
router.put('/resetpassword/:resettoken', UserController.resetPassword)


module.exports = router;