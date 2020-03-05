const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')
const dbUtils = require('../utils/dbutils')

const getOnePost = async (postId) => {
  const getOnePostQuery = `SELECT pt.*, usr.first_name, usr.last_name, usr.avatar
    FROM post as pt
    LEFT JOIN users as usr ON pt.user_id = usr.user_id
    WHERE pt.post_id=$1`
  try {
    const {
      rows
    } = await dbQuery.query(getOnePostQuery, [postId])
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

const getListPostByMonth = async (order_by, sort_by, month, year, page, limit) => {
  console.log(order_by)
  const skipNum = (page - 1) * limit
  const getListPostQuery = `SELECT *, count(*) OVER() AS total_count
    FROM post
    WHERE EXTRACT(MONTH FROM create_at) = $1 AND EXTRACT(YEAR FROM create_at) = $2
    ORDER BY ` + order_by + ` ${sort_by}
    OFFSET $3 LIMIT $4`
  try {
    const {
      rows
    } = await dbQuery.query(getListPostQuery, [month, year, skipNum, limit])
    if (!rows) {
      return null
    } else if (rows.length === 0) {
      return {
        data: [],
        message: 'no data',
        page: page,
        limit: limit
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

const getListPostByCategory = async (order_by, sort_by, category_id, page, limit) => {
  const skipNum = (page - 1) * limit
  const getListPostQuery =
    `SELECT *, count(*) OVER() AS total_count
  FROM post
  WHERE category_id = $1 OR category_id IN (
      SELECT c1.category_id
      FROM category AS c1
      WHERE (c1.parent_id = $1 AND c1.level = 2) OR 
            c1.parent_id IN (SELECT c2.category_id
                            FROM category c2
                            WHERE c2.parent_id = $1 AND c2.category_id = c1.parent_id AND c2.level=1)
  )
  ORDER BY ` + order_by + ` ${sort_by}
  OFFSET $2 LIMIT $3`
  try {
    const {
      rows
    } = await dbQuery.query(getListPostQuery, [category_id, skipNum, limit])
    if (!rows) {
      return null
    } else if (rows.length === 0) {
      return {
        data: [],
        message: 'no data',
        page: page,
        limit: limit
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

const getListPostByTag = async (order_by, sort_by, tag_id, page, limit) => {

}

const getListPostFilter = async (order_by, sort_by, category_id, create_at, update_at, is_block, enable_comment, verify, page, limit) => {
  const skipNum = (page - 1) * limit
  const variables_list = {
    category_id,
    create_at,
    update_at,
    is_block,
    enable_comment,
    verify
  }
  const resultQuery = dbUtils.makeQueryFilter(variables_list)
  resultQuery.values.push(skipNum)
  resultQuery.values.push(limit)
  const getListPostQuery =
    `SELECT *, count(*) OVER() AS total_count
    FROM post 
    ${resultQuery.query}
    ORDER BY ` + order_by + ` ${sort_by}
    OFFSET $${resultQuery.count++} LIMIT $${resultQuery.count++}`
  try {
    const {
      rows
    } = await dbQuery.query(getListPostQuery, resultQuery.values)
    if (!rows) {
      return null
    } else if (rows.length === 0) {
      return {
        data: [],
        message: 'no data',
        page: page,
        limit: limit
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

const createPost = async (client, postValues) => { // transaction
  const createPostQuery = `INSERT INTO
    post(title, create_at, update_at, overview, content, user_id, category_id, post_slug, admin_id, verify, is_block, enable_comment, view)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    returning *`
  try {
    const {
      rows
    } = await client.query(createPostQuery, postValues)
    const dbResponse = rows[0]
    if (!dbResponse) {
      return null
    }
    delete dbResponse.admin_id
    delete dbResponse.verify
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
  console.log(postValues)
  const updatePostQuery = `UPDATE post
      SET is_block=$1, update_at=$2, admin_id = $3
      WHERE post_id=$4 returning *`
  try {
    const {
      rows
    } = await dbQuery.query(updatePostQuery, postValues)
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
      SET enable_comment=$1, update_at=$2, admin_id = $3
      WHERE post_id=$4 returning *`
  try {
    const {
      rows
    } = await dbQuery.query(updatePostQuery, postValues)
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

const changeVerify = async (postValues) => {
  const updatePostQuery = `UPDATE post
      SET verify=$1, update_at=$2, admin_id = $3
      WHERE post_id=$4 returning *`
  try {
    const {
      rows
    } = await dbQuery.query(updatePostQuery, postValues)
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
      SET title=$1, update_at=$2, overview=$3, content=$4, category_id=$5, post_slug=$6
      WHERE post_id=$7 returning *`
  try {
    const {
      rows
    } = await dbQuery.query(updatePostQuery, postValues)
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
  const deletePostQuery = 'DELETE FROM post WHERE post_id=$1 returning *'
  try {
    const {
      rows
    } = await dbQuery.query(deletePostQuery, [postId])
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
  getListPostFilter,
  createPost,
  changeBlockStatus,
  changeCommentStatus,
  changeVerify,
  updatePost,
  deletePost
}