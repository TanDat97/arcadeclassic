/*
 *
 * account actions
 *
 */

import { accountConstants } from '../_constants'

export const accountAction = {
  defaultAction,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  getInfoUserRequest,
  getInfoUserSuccess,
  getInfoUserFail
}

function defaultAction(user, user_scope, user_token) {
  return {
    type: accountConstants.DEFAULT_ACTION,
    user,
    user_scope,
    user_token
  }
}

function userLoginRequest(email, user_name, password, scope) {
  return {
    type: accountConstants.LOGIN_REQUEST,
    email,
    user_name,
    password,
    scope
  }
}

function userLoginSuccess(user, user_scope, user_token) {
  return {
    type: accountConstants.LOGIN_SUCCESS,
    user,
    user_scope,
    user_token
  }
}

function userLoginFail() {
  window.localStorage.removeItem('studio/token');
  window.localStorage.removeItem('studio/scope');
  return {
    type: accountConstants.LOGIN_FAILURE,
  }
}

function userLogout() {
  window.localStorage.removeItem('studio/token');
  window.localStorage.removeItem('studio/scope');
  return {
    type: accountConstants.LOGOUT,
  }
}

function getInfoUserRequest() {
  return {
    type: accountConstants.GET_INFO_REQUEST
  }
}

function getInfoUserSuccess(user) {
  return {
    type: accountConstants.GET_INFO_SUCCESS,
    user: user
  }
}

function getInfoUserFail() {
  return {
    type: accountConstants.GET_INFO_FAILURE
  }
}