const moment = require('moment');

const pool = require('../db/pool.js');
const dbQuery = require('../db/dbQuery');
const dbUtils = require('../utils/dbutils')

const getOneTag = async (tagId) => {
  const getOneTagQuery = 'SELECT * FROM tag WHERE id=$1'
  try {
    const { rows } = await dbQuery.query(getOneTagQuery, [tagId])
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

const getListTag = async (page, limit) => {
  const skipNum = (page - 1) * limit
  const getListTagQuery = `SELECT *, count(*) OVER() AS total_count
    FROM tag
    ORDER BY id ASC
    OFFSET $1 LIMIT $2`
  try {
    const { rows } = await dbQuery.query(getListTagQuery, [skipNum, limit])
    if (!rows) {
      return null
    }
    const keys_value = dbUtils.getPropertyValue(rows, ['total_count'])
    return {
      data: rows,
      total_count: keys_value.total_count
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

const createTag = async (tagValues) => {
  const createTagQuery = `INSERT INTO
      tag(name, create_at, update_at)
      VALUES($1, $2, $3)
      returning *`
  try {
    const { rows } = await dbQuery.query(createTagQuery, tagValues)
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

const updateTag = async (tagId, tagValues) => {
  const findTagQuery = 'SELECT * FROM tag WHERE id=$1'
  const updateTag = `UPDATE tag
        SET name=$1, update_at=$2 WHERE id=$3 returning *`
  try {
    const { rows } = await dbQuery.query(findTagQuery, [tagId])
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    const response = await dbQuery.query(updateTag, tagValues)
    const dbResult = response.rows[0]
    return dbResult
  } catch (err) {
    console.log(err)
    return null
  }
}

const deleteTag = async (tagId) => {
  const deleteTagQuery = 'DELETE FROM tag WHERE id=$1 returning *'
  try {
    const { rows } = await dbQuery.query(deleteTagQuery, [tagId])
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
  getOneTag,
  getListTag,
  createTag,
  updateTag,
  deleteTag
}