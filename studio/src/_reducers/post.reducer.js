/*
 *
 * post reducer
 *
 */

import { postConstants } from '../_constants'

export const initialState = {
  loading: false,
  success: 0,
  type: '',
  posts: [],
  postDetail: {},
  total: 0,
  rootCategory: [],
  childCategory: [],
};

function account(state = initialState, action) {
  switch (action.type) {
    case postConstants.DEFAULT_GET_ACTION:
      return initialState
    case postConstants.ADMIN_GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0,
        type: 'post',
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
        loading: false,
        success: -1
      };
    case postConstants.ADMIN_GET_ONE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0,
        type: 'post',
      }
    case postConstants.ADMIN_GET_ONE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        postDetail: action.res
      };
    case postConstants.ADMIN_GET_ONE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        success: -1
      };
    case postConstants.GET_CATEGORY_ROOT_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0,
        type: 'category',
      }
    case postConstants.GET_CATEGORY_ROOT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        rootCategory: action.res,
      };
    case postConstants.GET_CATEGORY_ROOT_FAILURE:
      return {
        ...state,
        loading: false,
        success: -1
      };
    case postConstants.GET_CATEGORY_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0,
        type: 'category',
      }
    case postConstants.GET_CATEGORY_CHILD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        childCategory: action.res,
      };
    case postConstants.GET_CATEGORY_CHILD_FAILURE:
      return {
        ...state,
        loading: false,
        success: -1
      };
    default:
      return state;
  }
}

export default account;