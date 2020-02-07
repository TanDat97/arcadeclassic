const express = require('express')
const router = express.Router()

const tagController = require('../../controllers/tagController');

router.get('/tag/:tagId', tagController.getOneTag);
router.post('/tag', tagController.createTag);
router.put('/tag/:tagId', tagController.updateTag);
router.delete('/tag/:tagId', tagController.deleteTag);

module.exports = router;