const moment = require('moment')

const credentialModel = require('../models/credential')
const userModel = require('../models/user')
const userRoleModel = require('../models/userrole')
const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
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
} = require('../utils/validation')

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
    user_slug,
    avatar,
    date_of_birth
  } = req.body;
  description = description ? description : ''
  user_slug = user_slug ? user_slug : ''
  avatar = avatar ? avatar : ''
  const create_at = moment(new Date())
  if (isEmpty(user_name)) {
    user_name = email
  }
  if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password) || isEmpty(date_of_birth)) {
    errorMessage.status = status.bad
    errorMessage.message = 'Email, password, first name and last name field cannot be empty'
    return res.status(status.bad).json(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.status = status.bad;
    errorMessage.message = 'Please enter a valid Email'
    return res.status(status.bad).send(errorMessage)
  }
  if (!validatePassword(password)) {
    errorMessage.status = status.bad
    errorMessage.message = 'Password is invalid, please try again';
    return res.status(status.bad).send(errorMessage)
  }
  const hashedPassword = hashPassword(password)
  const client = await dbQuery.clientConnect(pool)
  try {
    await client.query("BEGIN");
    try {
      const credentialValues = [email, user_name, hashedPassword, '', create_at];
      const credentialRes = await credentialModel.createCredential(client, credentialValues)
      if (credentialRes == null) {
        errorMessage.message = 'Operation was not successful'
        res.status(status.error).json(errorMessage)
        return dbQuery.rollback(client)
      } else {
        const credential_id = credentialRes.credential_id
        const userValues = [email, user_name, first_name, last_name, description, avatar, user_slug, create_at, credential_id, date_of_birth];
        const userRes = await userModel.createUser(client, userValues)
        if(userRes == null) {
          errorMessage.message = 'Operation was not successful'
          res.status(status.error).json(errorMessage)
          return dbQuery.rollback(client)
        } else {
          const user_id = userRes.user_id
          const userRoleValues = [user_id, 1]
          const userRoleRes = await userRoleModel.createUserRole(client, userRoleValues)
          if (userRoleRes == null) {
            errorMessage.message = 'Operation was not successful'
            res.status(status.error).json(errorMessage);
            return dbQuery.rollback(client)
          } else {
            client.query("COMMIT")
            successMessage.status = status.created
            successMessage.message = 'Sign up success'
            successMessage.response = {}
            return res.status(status.created).json(successMessage)
          }
        }
      }
    } catch (err) {
      errorMessage.status = status.error;
      errorMessage.message = 'Operation was not successful'
      return res.status(status.error).json(errorMessage)
    }
  } finally {
    client.release()
    console.log('client is released')
  }
}

const signinUser = async (req, res) => {
  const {
    email,
    user_name,
    password
  } = req.body;
  if (isEmpty(email) && isEmpty(password) || (isEmpty(user_name) && isEmpty(password))) {
    errorMessage.status = status.bad;
    errorMessage.message = 'Please enter enough field to signin'
    return res.status(status.bad).json(errorMessage);
  }
  if (!isEmpty(email) && !isEmpty(password) && (!isValidEmail(email) || !validatePassword(password))) {
    errorMessage.status = status.bad;
    errorMessage.message = 'Please enter a valid Email/Username or Password'
    return res.status(status.bad).send(errorMessage);
  } else if (!isEmpty(user_name) && !isEmpty(password) && !validatePassword(password)) {
    errorMessage.status = status.bad;
    errorMessage.message = 'Please enter a valid Email/Username or Password'
    return res.status(status.bad).send(errorMessage)
  }
  try {
    const loginTemp = await credentialModel.signinRequest(email, user_name, password)
    if (!loginTemp) {
      errorMessage.status = status.bad;
      errorMessage.message = 'Your information is not correct, please try again'
      return res.status(status.bad).json(errorMessage)
    }
    const userInfo = await userModel.getInfoUser(email, user_name)
    if (userInfo != null) {
      const token = generateUserToken(userInfo.user_id, userInfo.email, userInfo.user_name, userInfo.first_name, userInfo.last_name, userInfo.role_name)
      delete userInfo.role_name
      successMessage.message = 'Signin success'
      successMessage.response = userInfo
      successMessage.response.token = token
      return res.status(status.success).json(successMessage)
    } else {
      throw new Error('cannot find user info')
    }
  } catch (err) {
    console.log(err)
    errorMessage.status = status.error;
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const getInfoUser = async (req, res) => {
  const {
    email,
    user_name
  } = req.userData
  try {
    const userInfo = await userModel.getInfoUser(email, user_name)
    if (userInfo != null) {
      delete userInfo.role_name
      successMessage.message = 'Get info user success'
      successMessage.response = userInfo
      return res.status(status.success).json(successMessage)
    } else {
      throw new Error('cannot find user info')
    }
  } catch (err) {
    console.log(err)
    errorMessage.status = status.error;
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const updateInfoUser = async (req, res) => {
  let {
    first_name,
    last_name,
    description,
    user_slug,
    avatar,
    date_of_birth
  } = req.body;
  description = description ? description : ''
  user_slug = user_slug ? user_slug : ''
  avatar = avatar ? avatar : ''
  if (isEmpty(first_name) || isEmpty(last_name) || isEmpty(date_of_birth)) {
    errorMessage.status = status.bad
    errorMessage.message = 'first name and last name, birthday field cannot be empty'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const userValues = [first_name, last_name, description, user_slug, avatar, date_of_birth, req.userData.user_id]
    const userInfo = await userModel.updateInfoUser(userValues)
    if (userInfo != null) {
      successMessage.message = 'Update info user success'
      successMessage.response = userInfo
      return res.status(status.success).json(successMessage)
    } else {
      throw new Error('some thing went wrong')
    }
  } catch (err) {
    console.log(err)
    errorMessage.status = status.error;
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

module.exports = {
  createUser,
  signinUser,
  getInfoUser,
  updateInfoUser
}