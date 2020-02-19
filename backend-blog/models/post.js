const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')


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
  createPost,
  changeBlockStatus,
  changeCommentStatus,
  updatePost,
  deletePost
}