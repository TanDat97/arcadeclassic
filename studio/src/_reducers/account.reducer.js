/*
 *
 * Account reducer
 *
 */

import { accountConstants } from '../_constants'

export const initialState = {
  loading: false,
  success: 0,
  authenticated: 'unauthorized',
  user: {},
  user_scope: null,
  user_token: null,
};

function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.DEFAULT_ACTION:
      return {
        ...state,
        user: action.user,
        user_scope: action.user_scope,
        user_token: action.user_token,
      }
    case accountConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        authenticated: 'authorized',
        user: action.user,
        user_scope: action.user_scope,
        user_token: action.user_token,
      };
    case accountConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: -1,
        authenticated: 'failed',
      };
    case accountConstants.LOGOUT:
      return {
        ...state,
        loading: false,
        success: 0,
        authenticated: 'unauthorized',
        user: {},
        user_scope: '',
        user_token: '',
      };
    case accountConstants.GET_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        success: 0,
        user: {}
      };
    case accountConstants.GET_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: 1,
        user: action.user,
      };
    case accountConstants.GET_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        success: -1,
        user: {},
      };
    default:
      return state;
  }
}

export default account;