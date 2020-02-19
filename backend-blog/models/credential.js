const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} = require('../utils/validation')

const signinRequest = async (email, user_name, password) => {
  const signinUserQuery = `SELECT * FROM credential WHERE email = $1 OR user_name = $2`
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

const createCredential = async (client, credentialValues) => { // transaction
  const createCredentialQuery = `INSERT INTO
      credential(email, user_name, password, reset_token, last_reset_password)
      VALUES($1, $2, $3, $4, $5)
      returning *`
  try {
    const { rows } = await client.query(createCredentialQuery, credentialValues)
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = {
  signinRequest,
  createCredential
}