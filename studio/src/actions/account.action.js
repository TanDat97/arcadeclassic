/*
 *
 * account actions
 *
 */

import { accountConstants } from '../constants/account.constant';

export const accountActions = {
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

function userLoginRequest(payload) {
    return {
        type: accountConstants.LOGIN_REQUEST,
        payload,
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