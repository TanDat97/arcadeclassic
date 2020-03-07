/*
 *
 * Account reducer
 *
 */

import { accountConstants } from '../_constants';

export const initialState = {
  loading: false,
  success: false,
  authenticated: 'unauthorized',
  user: {},
  user_scope: '',
  user_token: '',
};

function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.DEFAULT_ACTION:
      return state;
    case accountConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        authenticated: 'authorized',
        user: action.user,
        user_scope: action.user_scope,
        user_token: action.user_token,

      };
    case accountConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        authenticated: 'unauthorized',
      };
    case accountConstants.LOGOUT:
      return {
        ...state,
        authenticated: 'unauthorized',
        user: {},
        user_scope: '',
        user_token: '',
      };
    case accountConstants.GET_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        user: {}
      };
    case accountConstants.GET_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.user,
      };
    case accountConstants.GET_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        user: {},
      };
    default:
      return state;
  }
}

export default account;