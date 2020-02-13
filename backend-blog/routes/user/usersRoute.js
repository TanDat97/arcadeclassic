const express = require('express')
const router = express.Router()

const verifyAuth = require('../../middlewares/verifyAuth')
const usersController = require('../../controllers/usersController')

router.post('/user', usersController.createUser)
router.post('/user/signin', usersController.signinUser)
router.get('/user', verifyAuth, usersController.getInfoUser)
router.put('/user', verifyAuth, usersController.updateInfoUser)

module.exports = router