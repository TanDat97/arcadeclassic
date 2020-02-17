const moment = require('moment');

const pool = require('../db/pool.js');
const dbQuery = require('../db/dbQuery');
const {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} = require('../utils/validation');

const createUserRole = async (client, userRoleValues) => {
  const createUserRoleQuery = `INSERT INTO
    userrole(user_id, role_id)
    VALUES($1, $2)
    returning *`
  try {
    const { rows } = await client.query(createUserRoleQuery, userRoleValues)
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
  createUserRole
}