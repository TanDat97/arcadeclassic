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

const createUser = async (client, userValues) => {
  const createUserQuery = `INSERT INTO
    users(email, user_name, first_name, last_name, description, avatar, slug, create_at, credential_id, date_of_birth)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    returning *`
  try {
    const { rows } = await client.query(createUserQuery, userValues)
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

const getInfoUser = async (email, user_name) => {
  const getUserQuery = 'SELECT * FROM users WHERE email = $1 OR user_name = $2'
  try {
    const { rows } = await dbQuery.query(getUserQuery, [email, user_name]);
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    delete dbResponse.credential_id
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

const updateInfoUser = async (userValues) => {
  const updateUserQuery = `UPDATE users
  SET first_name=$1, last_name=$2, description=$3, slug=$4, avatar=$5, date_of_birth=$6
  WHERE id=$7 returning *`;
  try{
    const { rows } = await dbQuery.query(updateUserQuery, userValues)
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    delete dbResponse.credential_id
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = {
  createUser,
  getInfoUser,
  updateInfoUser
}