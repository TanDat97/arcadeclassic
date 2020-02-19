const express = require('express')
const router = express.Router()

const verifyAuthAdmin = require('../../middlewares/verifyAuthAdmin')
const postController = require('../../controllers/postController')

router.get('/post/get_one/:postId', postController.getOnePost)
// router.get('/post/get_list', postController.getListPost)
router.post('/post', verifyAuthAdmin, postController.createPost)
router.post('/post/change_block/:postId', verifyAuthAdmin, postController.changeBlockStatus)
router.post('/post/change_comment/:postId', verifyAuthAdmin, postController.changeCommentStatus)
router.put('/post/:postId', verifyAuthAdmin, postController.updatePost)
router.delete('/post/:postId', verifyAuthAdmin, postController.deletePost)

module.exports = router