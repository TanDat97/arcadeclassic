const express = require('express')
const router = express.Router()

const verifyAuthAdmin = require('../../middlewares/verifyAuthAdmin')
const tagController = require('../../controllers/tagController')

router.get('/tag/getone/:tagId', tagController.getOneTag)
router.get('/tag/getlist', verifyAuthAdmin, tagController.getListTag)
router.post('/tag', verifyAuthAdmin, tagController.createTag)
router.put('/tag/:tagId', verifyAuthAdmin, tagController.updateTag)
router.delete('/tag/:tagId', verifyAuthAdmin, tagController.deleteTag)

module.exports = router