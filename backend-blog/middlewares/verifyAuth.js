const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { status } = require('../utils/status')

dotenv.config()

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.secret)
    // console.log(decoded)
    req.userData = decoded
    next()
  } catch (error) {
    return res.status(status.unauthorized).json({
      status: status.unauthorized,
      message: 'token failed or not provided'
    })
  }
}

module.exports = verifyToken