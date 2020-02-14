const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const {
  errorMessage,
  successMessage,
  status
} = require('../utils/status')
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} = require('../utils/validation')

const signinRequest = async (email, user_name, password) => {
  const signinUserQuery = 'SELECT * FROM credential WHERE email = $1 OR user_name = $2'
  try {
    const { rows } = await dbQuery.query(signinUserQuery, [email, user_name])
    const dbResponse = rows[0]
    if (!dbResponse || !comparePassword(password, dbResponse.password)) {
      return false
    }
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = {
  signinRequest
}