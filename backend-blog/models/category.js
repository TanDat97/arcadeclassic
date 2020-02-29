const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const dbUtils = require('../utils/dbutils')

const getListRootCategory = async () => {
  const getListRootCategoryQuery = 
  `SELECT c2.*, c1.category_id as root_id, c1.category_name as root_name, c1.category_slug as root_slug
    FROM category as c1
    LEFT JOIN category as c2 ON c1.category_id = c2.parent_id
    WHERE c1.parent_id=0
    ORDER BY c1.category_id`
  try {
    const { rows } = await dbQuery.query(getListRootCategoryQuery, [])
    const dbResponse = dbUtils.division2Level(rows, ['root_id', 'root_name', 'root_slug'])
    if (!dbResponse) {
      return null
    }
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

const getListChildCategory = async (categoryId) => {
  const getListChildCategoryQuery = `SELECT * FROM category
    WHERE parent_id=$1`
  try {
    const { rows } = await dbQuery.query(getListChildCategoryQuery, [categoryId])
    const dbResponse = rows
    if (!dbResponse) {
      return null
    }
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

const createCategory = async (categoryValues) => {
  const createCategoryQuery = `INSERT INTO
      category(parent_id, category_name, category_slug, user_id, level)
      VALUES($1, $2, $3, $4, $5)
      returning *`
  try {
    const { rows } = await dbQuery.query(createCategoryQuery, categoryValues)
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

const updateCategory = async (categoryValues) => {
  const updateCategory = `UPDATE category
        SET parent_id=$1, category_name=$2, category_slug=$3, level=$4 WHERE category_id=$5 returning *`
  try {
    const { rows } = await dbQuery.query(updateCategory, categoryValues)
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

const deleteCategory = async (categoryId) => {
  const deleteCategoryQuery = 'DELETE FROM category WHERE category_id=$1 returning *'
  try {
    const { rows } = await dbQuery.query(deleteCategoryQuery, [categoryId])
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
  getListRootCategory,
  getListChildCategory,
  createCategory,
  updateCategory,
  deleteCategory
}