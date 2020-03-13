/*
 *
 * post reducer
 *
 */

import { postConstants } from '../_constants'

export const initialState = {
  loading: false,
  success: 0,
  posts: [],
  postDetail: {},
  total: 0,
  rootCateogry: [],
  cache: {}
};

function account(state = initialState, action) {
  switch (action.type) {
    case postConstants.DEFAULT_GET_ACTION:
      return initialState
    case postConstants.ADMIN_GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0
      }
    case postConstants.ADMIN_GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        posts: action.res.data,
        total: action.res.total_count ? action.res.total_count : 0
      };
    case postConstants.ADMIN_GET_POSTS_FAILURE:
      return {
        ...state,
        loading: true,
        success: -1
      };
    case postConstants.GET_CATEGORY_ROOT_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0
      }
    case postConstants.GET_CATEGORY_ROOT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        rootCateogry: action.res,
      };
    case postConstants.GET_CATEGORY_ROOT_FAILURE:
      return {
        ...state,
        loading: true,
        success: -1
      };
    case postConstants.SAVE_CACHE:
      const data = state.cache
      data[action.key] = action.value
      return {
        ...state,
        cache: data
      }
    default:
      return state;
  }
}

export default account;