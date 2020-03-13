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
  getCategoryRootRequest,
  getCategoryRootSuccess,
  getCategoryRootFail,
  saveCache
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

function adminGetPostsFail() {
  return {
    type: postConstants.ADMIN_GET_POSTS_FAILURE,
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

function getCategoryRootFail() {
  return {
    type: postConstants.GET_CATEGORY_ROOT_FAILURE,
  }
}

function saveCache(key, value) {
  return {
    type: postConstants.SAVE_CACHE,
    key,
    value,
  }
}

