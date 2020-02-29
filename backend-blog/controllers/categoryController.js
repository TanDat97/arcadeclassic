const moment = require('moment')

const categoryModel = require('../models/category')
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

const getListRootCategory = async (req, res) => {
  try {
    const dbResponse = await categoryModel.getListRootCategory()
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'categories cannot be found'
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

const getListChildCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (isEmpty(categoryId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await categoryModel.getListChildCategory(categoryId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'categories cannot be found'
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

const createCategory = async (req, res) => {
  const {
    parent_id,
    category_name,
    category_slug,
    level
  } = req.body;
  if (isEmpty(category_name) || isEmpty(category_slug) || parent_id === undefined || parent_id < 0) {
    console.log(!parent_id)
    errorMessage.message = 'Name, slug or parent field cannot be empty'
    return res.status(status.bad).json(errorMessage)
  }
  const categoryValues = [
    parent_id,
    category_name,
    category_slug,
    req.userData.user_id,
    level
  ];
  try {
    const dbResponse = await categoryModel.createCategory(categoryValues)
    if (!dbResponse) {
      errorMessage.status = status.error
      errorMessage.message = 'Category cannot be created'
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

const updateCategory = async (req, res) => {
  const { categoryId } = req.params
  const { parent_id, category_name, category_slug, level } = req.body
  if (isEmpty(categoryId) || isEmpty(category_name) || parent_id === undefined || parent_id < 0 || isEmpty(category_slug)) {
    errorMessage.message = 'id, category_name, parent, category_slug is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  const categoryValues = [
    parent_id,
    category_name,
    category_slug,
    level,
    categoryId
  ];
  try {
    const dbResponse = await categoryModel.updateCategory(categoryValues)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Category cannot be found'
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

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params
  if (isEmpty(categoryId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await categoryModel.deleteCategory(categoryId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Category cannot be found'
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
  getListRootCategory,
  getListChildCategory,
  createCategory,
  updateCategory,
  deleteCategory
}