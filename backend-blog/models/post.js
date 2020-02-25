const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const dbUtils = require('../utils/dbutils')

const getOnePost = async (postId) => {
  const getOnePostQuery = `SELECT pt.*, usr.first_name, usr.last_name, usr.avatar
    FROM post as pt
    LEFT JOIN users as usr ON pt.user_id = usr.id
    WHERE pt.id=$1`
  try {
    const { rows } = await dbQuery.query(getOnePostQuery, [postId])
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

const getListPostByMonth = async (month, year, page, limit) => {
  const skipNum = (page - 1) * limit
  const getListPostQuery = `SELECT *, count(*) OVER() AS total_count
    FROM post
    WHERE EXTRACT(MONTH FROM create_at) = $1 AND EXTRACT(YEAR FROM create_at) = $2
    ORDER BY create_at DESC
    OFFSET $3 LIMIT $4`
  try {
    const { rows } = await dbQuery.query(getListPostQuery, [month, year, skipNum, limit])
    if (!rows) {
      return null
    } else if(rows.length === 0) {
      return {
        data: [],
        total_count: 0
      }
    }
    const keys_value = dbUtils.getPropertyValue(rows, ['total_count'])
    return {
      data: rows,
      total_count: keys_value.total_count,
      page: page,
      limit: limit
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

const getListPostByCategory = async (category_id ,page, limit) => {
  const skipNum = (page - 1) * limit
  const getListPostQuery = 
  `SELECT *, count(*) OVER() AS total_count
  FROM post
  WHERE category_id = $1 OR category_id IN (
      SELECT c1.id
      FROM category AS c1
      WHERE (c1.parent_id = $1 AND c1.level = 2) OR 
            c1.parent_id IN (SELECT c2.id
                            FROM category c2
                            WHERE c2.parent_id = $1 AND c2.id = c1.parent_id AND c2.level=1)
  )
  ORDER BY create_at DESC
  OFFSET $2 LIMIT $3`
  try {
    const { rows } = await dbQuery.query(getListPostQuery, [category_id, skipNum, limit])
    if (!rows) {
      return null
    } else if(rows.length === 0) {
      return {
        data: [],
        total_count: 0
      }
    }
    const keys_value = dbUtils.getPropertyValue(rows, ['total_count'])
    return {
      data: rows,
      total_count: keys_value.total_count,
      page: page,
      limit: limit
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

const getListPostByTag = async (tag_id ,page, limit) => {

}

const createPost = async (client, postValues) => { // transaction
  const createPostQuery = `INSERT INTO
    post(title, create_at, update_at, overview, content, user_id, category_id, slug, is_block, enable_comment, view)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning *`
  try {
    const { rows } = await client.query(createPostQuery, postValues)
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    delete dbResponse.user_id
    delete dbResponse.category_id
    delete dbResponse.is_block
    delete dbResponse.enable_comment
    return dbResponse
  } catch (err) {
    console.log(err)
    return null
  }
}

const changeBlockStatus = async (postValues) => {
  const updatePostQuery = `UPDATE post
      SET is_block=$1, update_at=$2
      WHERE id=$3 returning *`
  try {
    const { rows } = await dbQuery.query(updatePostQuery, postValues)
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

const changeCommentStatus = async (postValues) => {
  const updatePostQuery = `UPDATE post
      SET enable_comment=$1, update_at=$2
      WHERE id=$3 returning *`
  try {
    const { rows } = await dbQuery.query(updatePostQuery, postValues)
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

const updatePost = async (postValues) => {
  const updatePostQuery = `UPDATE post
      SET title=$1, update_at=$2, overview=$3, content=$4, category_id=$5, slug=$6
      WHERE id=$7 returning *`
  try {
    const { rows } = await dbQuery.query(updatePostQuery, postValues)
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

const deletePost = async (postId) => {
  const deletePostQuery = 'DELETE FROM post WHERE id=$1 returning *'
  try {
    const { rows } = await dbQuery.query(deletePostQuery, [postId])
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
  getOnePost,
  getListPostByMonth,
  getListPostByCategory,
  getListPostByTag,
  createPost,
  changeBlockStatus,
  changeCommentStatus,
  updatePost,
  deletePost
}