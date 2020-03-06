import { call, put } from 'redux-saga/effects';

export function* loginUser(action) {
  // try {
  //   const res = yield call(accountService.login, action.email, action.password)
  //   if (res.accessToken) {
  //     window.localStorage.setItem('studio/token', res.accessToken)
  //     yield put(accountAction.userLoginSuccess())
  //     yield put(accountAction.getInfoUserRequest())
  //   } else {
  //     yield put(accountAction.userLoginFail())
  //   }
  // } catch (err) {
  //   yield put(accountAction.userLoginFail())
  // }
}

export function* getInfoUser() {
  // try {
  //   const res = yield call(accountService.getInfoUser)
  //   if (res) {
  //     yield put(accountAction.getInfoUserSuccess(res.user))
  //   } else {
  //     yield put(accountAction.getInfoUserFail())
  //   }
  // } catch (err) {
  //   yield put(accountAction.getInfoUserFail())
  // }
}