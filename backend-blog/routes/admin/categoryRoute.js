const express = require('express')
const router = express.Router()

const verifyAuthAdmin = require('../../middlewares/verifyAuthAdmin')
const categoryController = require('../../controllers/categoryController')

router.get('/category/get_list_root', verifyAuthAdmin, categoryController.getListRootCategory)
router.get('/category/get_list_child/:categoryId', verifyAuthAdmin, categoryController.getListChildCategory)
router.post('/category', verifyAuthAdmin, categoryController.createCategory)
router.put('/category/:categoryId', verifyAuthAdmin, categoryController.updateCategory)
router.delete('/category/:categoryId', verifyAuthAdmin, categoryController.deleteCategory)

module.exports = router