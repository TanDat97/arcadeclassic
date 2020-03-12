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
  order: 'create',
  sort: 'decrease',
  category: 0,
  create: {
    start: '',
    end: '',
  },
  update: {
    start: '',
    end: '',
  },
  block: null,
  comment: null,
  verify: null,
  page: 1,
  limit: 20,
  total: 0,
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
    default:
      return state;
  }
}

export default account;