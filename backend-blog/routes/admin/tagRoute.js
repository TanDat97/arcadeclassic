const express = require('express')
const router = express.Router()

const { getOneTag, createTag, updateTag } = require('../../controllers/tagController');

router.get('/tag/:tagId', getOneTag);
router.post('/tag', createTag);
router.put('/tag/:tagId', updateTag);

module.exports = router;