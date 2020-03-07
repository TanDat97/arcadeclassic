import { call, put } from 'redux-saga/effects'
import { accountAction } from '_actions'
import APIService from 'utils/APIService'
import UrlUtils from 'utils/UrlUtils'

export function* loginUser(action) {
  try {
    const data = {
      email: action.email,
      password: action.password
    }
    const res = yield call(APIService.API_REQUEST(UrlUtils.api.userSignin, {}, data, 'post'))
    if (res) {
      console.log(res)
      window.localStorage.setItem('studio/token', 'token')
      yield put(accountAction.userLoginSuccess())
      yield put(accountAction.getInfoUserRequest())
    } else {
      yield put(accountAction.userLoginFail())
    }
  } catch (err) {
    console.log(err)
    yield put(accountAction.userLoginFail())
  }
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