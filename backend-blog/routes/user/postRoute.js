const express = require('express')
const router = express.Router()

const verifyAuth = require('../../middlewares/verifyAuth')
const postController = require('../../controllers/postController')



module.exports = router