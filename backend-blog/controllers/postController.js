const moment = require('moment')

const postModel = require('../models/post')
const postTagModel = require('../models/posttag')
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

const getOnePost = async (req, res) => {
  const { postId } = req.params
  if (isEmpty(postId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await postModel.getOnePost(postId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Post cannot be found'
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

const getListPostByMonth = async (req, res) => {
  const { month, year, page, limit} = req.body
  try {
    const dbResponse = await postModel.getListPostByMonth(month, year, page, limit)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Something went wrong'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.message = "Get list post success"
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const getListPostByCategory = async (req, res) => {
  const {
    category_id,
    page,
    limit
  } = req.body
  try {
    const dbResponse = await postModel.getListPostByCategory(category_id, page, limit)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Something went wrong'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.message = "Get list post success"
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }

}

const getListPostByTag = async (req, res) => {

}

const createPost = async (req, res) => {
  let {
    title,
    overview,
    content,
    slug,
    category_id,
    tag_id
  } = req.body;
  slug = slug ? slug : ''
  const create_at = moment(new Date())
  const update_at = create_at

  if (isEmpty(title) || isEmpty(overview) || isEmpty(content) || category_id === undefined || category_id < 0 || tag_id === undefined || tag_id < 0) {
    errorMessage.status = status.bad
    errorMessage.message = 'title, overview, content, category, tag field cannot be empty'
    return res.status(status.bad).json(errorMessage);
  }
  const client = await dbQuery.clientConnect(pool)
  try {
    const postValues = [title, create_at, update_at, overview, content, req.userData.user_id, category_id, slug, false, true, 0]
    const postRes = await postModel.createPost(client, postValues)
    if (postRes == null) {
      errorMessage.message = 'Operation was not successful'
      res.status(status.error).json(errorMessage)
      return dbQuery.rollback(client)
    } else {
      const post_id = postRes.id
      const postTagValues = [post_id, tag_id, create_at]
      const postTagRes = await postTagModel.createPostTag(client, postTagValues)
      if (postTagRes == null) {
        errorMessage.message = 'Operation was not successful'
        res.status(status.error).json(errorMessage);
        return dbQuery.rollback(client)
      } else {
        client.query("COMMIT")
        successMessage.status = status.created
        successMessage.message = 'Create post success'
        successMessage.response = postRes
        return res.status(status.created).json(successMessage)
      }
    }
  } catch (err) {
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  } finally {
    client.release()
    console.log('client is released')
  }
}

const changeBlockStatus = async (req, res) => {
  const { postId } = req.params
  const { is_block } = req.body
  if (isEmpty(postId) || is_block === null || is_block === undefined) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  const update_at = moment(new Date())
  const postValues = [is_block, update_at, postId];
  try {
    const dbResponse = await postModel.changeBlockStatus(postValues)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Post cannot be found'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.message = 'Change block status success'
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}

const changeCommentStatus = async (req, res) => {
  const { postId } = req.params
  const { enable_comment } = req.body
  if (isEmpty(postId) || enable_comment === null || enable_comment === undefined) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  const update_at = moment(new Date())
  const postValues = [enable_comment, update_at, postId];
  try {
    const dbResponse = await postModel.changeCommentStatus(postValues)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Post cannot be found'
      return res.status(status.notfound).json(errorMessage)
    }
    successMessage.status = status.success
    successMessage.message = 'Change comment status success'
    successMessage.response = dbResponse
    return res.status(status.success).json(successMessage)
  } catch (err) {
    errorMessage.status = status.error
    errorMessage.message = 'Operation was not successful'
    return res.status(status.error).json(errorMessage)
  }
}


const updatePost = async (req, res) => {
  const { postId } = req.params
  const { 
    title,
    overview,
    content,
    slug,
    category_id
  } = req.body
  if (isEmpty(title) || isEmpty(overview) || isEmpty(content) || category_id === undefined || category_id < 0) {
    errorMessage.status = status.bad
    errorMessage.message = 'title, overview, content, category field cannot be empty'
    return res.status(status.bad).json(errorMessage);
  }
  const update_at = moment(new Date())
  const postValues = [
    title,
    update_at,
    overview,
    content,
    category_id,
    slug,
    postId
  ];
  try {
    const dbResponse = await postModel.updatePost(postValues)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Post cannot be found'
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

const deletePost = async (req, res) => {
  const { postId } = req.params
  if (isEmpty(postId)) {
    errorMessage.message = 'id is invalid'
    return res.status(status.bad).json(errorMessage)
  }
  try {
    const dbResponse = await postModel.deletePost(postId)
    if (!dbResponse) {
      errorMessage.status = status.notfound
      errorMessage.message = 'Post cannot be found'
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