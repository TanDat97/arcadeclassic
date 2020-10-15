import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: 'server is online',
  })
})

export default router;
