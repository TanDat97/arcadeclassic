const express = require('express')
const router = express.Router()

const verifyAuthAdmin = require('../../middlewares/verifyAuthAdmin')
const postController = require('../../controllers/postController')



module.exports = router