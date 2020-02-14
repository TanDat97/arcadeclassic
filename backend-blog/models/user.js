const moment = require('moment');

const pool = require('../db/pool.js');
const dbQuery = require('../db/dbQuery');
const {
  errorMessage,
  successMessage,
  status
} = require('../utils/status');
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} = require('../utils/validation');

const getInfoUser = async (email, user_name) => {
  const getUserQuery = 'SELECT * FROM users WHERE email = $1 OR user_name = $2'
  try {
    const { rows } = await dbQuery.query(getUserQuery, [email, user_name]);
    const dbResponse = rows[0];
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
    const dbResponse = rows[0];
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
  getInfoUser,
  updateInfoUser
}