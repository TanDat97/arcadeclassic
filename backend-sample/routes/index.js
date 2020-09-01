const router = require('express').Router()

const utils = require('../utils/utils')

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: 'server is online',
  })
})

module.exports = router