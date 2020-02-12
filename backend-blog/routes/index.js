const router = require('express').Router()

const { status } = require('../utils/status');

router.get('/', (req, res, next) => {
  res.status(status.success).json({
    status: status.success,
    message: 'server is online',
  })
})

module.exports = router