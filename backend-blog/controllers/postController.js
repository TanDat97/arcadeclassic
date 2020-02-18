const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const {
  errorMessage,
  successMessage,
  status
} = require('../utils/status');
const {
  isValidEmail,
  isEmpty,
} = require('../utils/validation')

const createPost = async (req, res) => {

}

module.exports = {
  createPost
}