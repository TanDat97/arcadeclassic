const moment = require('moment')

const pool = require('../db/pool.js')
const dbQuery = require('../db/dbQuery')

const createPostTag = async (client, postTagValues) => { // transaction
  const createPostTagQuery = `INSERT INTO
    posttag(post_id, tag_id, create_at)
    VALUES($1, $2, $3)
    returning *`
  try {
    const { rows } = await client.query(createPostTagQuery, postTagValues)
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
  createPostTag
}