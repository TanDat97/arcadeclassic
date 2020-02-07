const moment = require('moment');

const dbQuery = require('../db/dbQuery');
const { errorMessage, successMessage, status } = require('../utils/status');
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
  const {
    email, user_name, first_name, last_name, password, description, slug, avatar, date_of_birth
  } = req.body;
  const create_at = moment(new Date());
  if(isEmpty(user_name)){
    user_name = email;
  }
  if(isEmpty(email)||isEmpty(first_name)||isEmpty(last_name)||isEmpty(password)||isEmpty(date_of_birth)) {
    errorMessage.message = 'Email, password, first name and last name field cannot be empty';
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
}