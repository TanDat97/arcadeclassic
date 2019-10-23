/*
 *
 * Account reducer
 *
 */

import { accountConstants } from '../constants';

export const initialState = {
  authenticated: 'unauthorized',
  user: '',
};

function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.DEFAULT_ACTION:
      return state;
    case accountConstants.LOGIN_REQUEST:
      return {
        ...state,
        authenticated: 'loading',
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: 'success',
      };
    case accountConstants.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: 'fail',
      };
    case accountConstants.LOGOUT:
      return {
        ...state,
        authenticated: 'unauthorized',
        user: '',
      };
    case accountConstants.GET_INFO_REQUEST:
      return {
        ...state,
        user: 'loading',
      };
    case accountConstants.GET_INFO_SUCCESS:
      return {
        ...state,
        authenticated: 'success',
        user: action.user,
      };
    case accountConstants.GET_INFO_FAILURE:
      return {
        ...state,
        user: 'fail',
      };
    default:
      return state;
  }
}

export default account;