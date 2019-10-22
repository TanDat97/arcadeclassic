import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';

import { accountAction } from '../actions'
import { accountService } from '../services'
import { accountConstants } from '../constants'

export function* loginUser(action) {
  try {
    const res = yield call(accountService.login, action.email, action.password)
    // console.log(res)
    if (res.token) {
      window.localStorage.setItem('studio/token', res.token.accessToken);
      yield put(accountAction.userLoginSuccess());
    } else {
      yield put(accountAction.userLoginFail());
    }
  } catch (err) {
    yield put(accountAction.userLoginFail());
  }
}