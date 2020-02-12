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

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createUser = async (req, res) => {
  let {
    email,
    user_name,
    first_name,
    last_name,
    password,
    description,
    slug,
    avatar,
    date_of_birth
  } = req.body;
  description = description ? description : ''
  slug = slug ? slug : ''
  avatar = avatar ? avatar : ''
  const create_at = moment(new Date());
  if (isEmpty(user_name)) {
    user_name = email;
  }
  if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password) || isEmpty(date_of_birth)) {
    errorMessage.message = 'Email, password, first name and last name,  field cannot be empty';
    return res.status(status.bad).json(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.message = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  if (!validatePassword(password)) {
    errorMessage.message = 'Password is invalid, please try again';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);
  const client = await dbQuery.clientConnect( pool);
  try {
    await client.query("BEGIN");
    try {
      const createCredentialQuery = `INSERT INTO
      credential(email, user_name, password, reset_token, last_reset_password)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
      const credentialValues = [email, user_name, hashedPassword, '', create_at];
      await client.query(createCredentialQuery, credentialValues, function (err, result1) {
        if (err) {
          errorMessage.message = 'Operation was not successful';
          res.status(status.error).json(errorMessage);
          return dbQuery.rollback(client);
        }
        const credential_id = result1.rows[0].id
        const createUserQuery = `INSERT INTO
        users(email, user_name, first_name, last_name, description, avatar, slug, create_at, credential_id, date_of_birth)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`;
        const userValue = [email, user_name, first_name, last_name, description, avatar, slug, create_at, credential_id, date_of_birth];
        client.query(createUserQuery, userValue, function (err, result2) {
          if (err) {
            errorMessage.message = 'Operation was not successful';
            res.status(status.error).json(errorMessage);
            return dbQuery.rollback(client);
          }
          const user_id = result2.rows[0].id
          const createUserRoleQuery = `INSERT INTO
          userrole(user_id, role_id)
          VALUES($1, $2)
          returning *`;
          const userRoleValue = [user_id, 1];
          client.query(createUserRoleQuery, userRoleValue, function (err, result3) {
            if (err) {
              errorMessage.message = 'Operation was not successful';
              res.status(status.error).json(errorMessage);
              return dbQuery.rollback(client);
            }
            client.query("COMMIT");
            successMessage.status = status.created;
            successMessage.message = 'Sign up success';
            return res.status(status.created).json(successMessage);
          })
        })
      });
    } catch (err) {
      errorMessage.message = 'Operation was not successful';
      return res.status(status.error).json(errorMessage);
    }
  } finally {
    client.release();
    console.log('client is released');
  }
}

module.exports = {
  createUser
}