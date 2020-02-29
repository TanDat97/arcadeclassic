const express = require('express')
const router = express.Router()

const verifyAuthAdmin = require('../../middlewares/verifyAuthAdmin')
const postController = require('../../controllers/postController')

router.get('/post/get_one/:postId', verifyAuthAdmin, postController.getOnePost)
router.post('/post/get_list/month', verifyAuthAdmin, postController.getListPostByMonth)
router.post('/post/get_list/category', verifyAuthAdmin, postController.getListPostByCategory)
router.post('/post/get_list/tag', verifyAuthAdmin, postController.getListPostByTag)
router.post('/post/get_list/filter', verifyAuthAdmin, postController.getListPostFilter)
router.post('/post', verifyAuthAdmin, postController.createPost)
router.post('/post/change_block/:postId', verifyAuthAdmin, postController.changeBlockStatus)
router.post('/post/change_comment/:postId', verifyAuthAdmin, postController.changeCommentStatus)
router.post('/post/change_verify/:postId', verifyAuthAdmin, postController.changeVerify)
router.put('/post/:postId', verifyAuthAdmin, postController.updatePost)
router.delete('/post/:postId', verifyAuthAdmin, postController.deletePost)

module.exports = router