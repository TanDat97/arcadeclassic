/*
 *
 * account actions
 *
 */

import { accountConstants } from '../constants'

export const accountAction = {
  defaultAction,
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  getInfoUserRequest,
  getInfoUserSuccess,
  getInfoUserFail
}

function defaultAction() {
  return {
    type: accountConstants.DEFAULT_ACTION,
  }
}

function userLoginRequest(email, password) {
  return {
    type: accountConstants.LOGIN_REQUEST,
    email,
    password
  }
}

function userLoginSuccess() {
  return {
    type: accountConstants.LOGIN_SUCCESS,
  }
}

function userLoginFail() {
  window.localStorage.removeItem('studio/token');
  return {
    type: accountConstants.LOGIN_FAILURE,
  }
}

function userLogout() {
  window.localStorage.removeItem('studio/token');
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