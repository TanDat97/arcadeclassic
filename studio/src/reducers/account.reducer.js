/*
 *
 * Account reducer
 *
 */

import { fromJS } from 'immutable';

import { accountConstants } from '../constants';

export const initialState = {
  user: 'abc',
  authenticated: 'unauthorized',
};

function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.DEFAULT_ACTION:
      return state;
    case accountConstants.LOGIN_REQUEST:
      return {
        ...state,
        type: accountConstants.LOGIN_REQUEST,
        authenticated: 'loading',
      };
    case accountConstants.LOGIN_SUCCESS:
      return {
        ...state,
        type: accountConstants.LOGIN_SUCCESS,
        authenticated: 'success',
      };
    case accountConstants.LOGIN_FAILURE:
      return {
        ...state,
        type: accountConstants.LOGIN_FAILURE,
        authenticated: 'fail',
      };
    default:
      return state;
  }
}

export default account;