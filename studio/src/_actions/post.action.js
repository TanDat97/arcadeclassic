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
  adminGetPostsFail
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
