/*
 *
 * post actions
 *
 */

import { postConstants } from '../_constants'

export const postAction = {
  defaultAction,
  adminGetPostsRequest,
  adminGetPostsSuccess,
  adminGetPostsFail,
  adminGetOnePostRequest,
  adminGetOnePostSuccess,
  adminGetOnePostsFail,
  getCategoryRootRequest,
  getCategoryRootSuccess,
  getCategoryRootFail,
  getCategoryChildRequest,
  getCategoryChildSuccess,
  getCategoryChildFail,
}

function defaultAction() {
  return {
    type: postConstants.DEFAULT_GET_ACTION,
  }
}

function adminGetPostsRequest(data) {
  return {
    type: postConstants.ADMIN_GET_POSTS_REQUEST,
    data
  }
}

function adminGetPostsSuccess(res) {
  return {
    type: postConstants.ADMIN_GET_POSTS_SUCCESS,
    res
  }
}

function adminGetPostsFail(err) {
  return {
    type: postConstants.ADMIN_GET_POSTS_FAILURE,
    err,
  }
}

function adminGetOnePostRequest(data) {
  return {
    type: postConstants.ADMIN_GET_ONE_POST_REQUEST,
    data
  }
}

function adminGetOnePostSuccess(res) {
  return {
    type: postConstants.ADMIN_GET_ONE_POST_SUCCESS,
    res
  }
}

function adminGetOnePostsFail(err) {
  return {
    type: postConstants.ADMIN_GET_ONE_POST_FAILURE,
    err,
  }
}

function getCategoryRootRequest(data) {
  return {
    type: postConstants.GET_CATEGORY_ROOT_REQUEST,
    data
  }
}

function getCategoryRootSuccess(res) {
  return {
    type: postConstants.GET_CATEGORY_ROOT_SUCCESS,
    res
  }
}

function getCategoryRootFail(err) {
  return {
    type: postConstants.GET_CATEGORY_ROOT_FAILURE,
    err
  }
}


function getCategoryChildRequest(data) {
  return {
    type: postConstants.GET_CATEGORY_CHILD_REQUEST,
    data
  }
}

function getCategoryChildSuccess(res) {
  return {
    type: postConstants.GET_CATEGORY_CHILD_SUCCESS,
    res
  }
}

function getCategoryChildFail(err) {
  return {
    type: postConstants.GET_CATEGORY_CHILD_FAILURE,
    err
  }
}
