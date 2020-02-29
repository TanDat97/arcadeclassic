const moment = require('moment')
const dbQuery = require('../db/dbQuery')
const tagModel = require('../models/tag')
const { errorMessage, successMessage, status } = require('../utils/status')
const { isEmpty } = require('../utils/validation')

/**
   * Create A Role
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

const getOneTag = async (req, res) => {
  const { tagId } = req.params;
  if (isEmpty(tagId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await tagModel.getOneTag(tagId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Tag cannot be found'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const getListTag = async (req, res) => {
  const { order, sort, page, limit } = req.query
  let order_by
  switch (order) {
    case 'name':
      order_by = 'name';
      break;
    case 'create':
      order_by = 'create_at';
      break;
    case 'update':
      order_by = 'update_at';
      break;
    default:
      order_by = 'name';
      break;
  }
  let sort_by
  switch (sort) {
    case 'ascending':
      sort_by = 'ASC';
      break;
    case 'decrease':
      sort_by = 'DESC';
      break;
    default:
      sort_by = 'ASC';
      break;
  }
  try {
    const dbResponse = await tagModel.getListTag(order_by, sort_by, page, limit)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Something went wrong'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.message = "Get list tag success"
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const createTag = async (req, res) => {
  const {
    name,
  } = req.body;
  const create_at = moment(new Date())
  const update_at = create_at
  if (isEmpty(name)) {
    errorMessage.message = 'Name field cannot be empty'
    return res.status(status.bad).json(errorMessage)
  }
  const tagValues = [
    name,
    create_at,
    update_at,
  ];
  try {
    const dbResponse = await tagModel.createTag(tagValues)
    if (!dbResponse) {
      errorMessage.status = status.error
      errorMessage.message = 'Tag cannot be created'
      return res.status(status.error).json(errorMessage)
    }
    successMessage.response = dbResponse
    successMessage.status = status.created
    return res.status(status.created).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const updateTag = async (req, res) => {
  const { tagId } = req.params
  const { tag_name } = req.body
  if (isEmpty(tagId) || isEmpty(tag_name)) {
    errorMessage.message = 'id or name is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  const update_at = moment(new Date())
  const tagValues = [
    tag_name,
    update_at,
    tagId
  ];
  try {
    const dbResponse = await tagModel.updateTag(tagValues)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Tag cannot be found'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const deleteTag = async (req, res) => {
  const { tagId } = req.params
  if (isEmpty(tagId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await tagModel.deleteTag(tagId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Tag cannot be found'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

module.exports = {
  getOneTag,
  getListTag,
  createTag,
  updateTag,
  deleteTag
}
