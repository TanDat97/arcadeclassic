/*
 *
 * account actions
 *
 */

import { accountConstants } from '../constants';

export const accountAction = {
  defaultAction,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
};

function defaultAction() {
  return {
    type: accountConstants.DEFAULT_ACTION,
  };
}

function userLoginRequest(email, password) {
  return {
    type: accountConstants.LOGIN_REQUEST,
    email,
    password
  };
}

function userLoginSuccess() {
  return {
    type: accountConstants.LOGIN_SUCCESS,
  };
}

function userLoginFail() {
  window.localStorage.removeItem('studio/token');
  return {
    type: accountConstants.LOGIN_FAILURE,
  };
}