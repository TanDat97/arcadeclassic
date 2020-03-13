import {
  call,
  put
} from 'redux-saga/effects'
import {
  accountAction
} from '_actions'
import APIService from 'utils/APIService'
import UrlUtils from 'utils/UrlUtils'
import AuthHeader from 'utils/AuthHeader'
import History from 'utils/BrowserHistory'

export function* loginUser(action) {
  try {
    const data = {
      email: action.email,
      user_name: action.user_name,
      password: action.password
    }
    const result = yield call(APIService.API_REQUEST, UrlUtils.api.userSignin, {}, data, 'post')
    if (result.response.role_name.toLowerCase().includes(action.scope)) {
      window.localStorage.setItem('studio/token', result.response.token)
      window.localStorage.setItem('studio/scope', result.response.role_name)
      yield put(accountAction.userLoginSuccess(result.response, result.response.role_name, result.response.token))
      if (action.scope === 'admin_role') {
        History.push('/admin')
      }
    } else {
      yield put(accountAction.userLoginFail(result))
    }
  } catch (err) {
    yield put(accountAction.userLoginFail(err))
  }
}

export function* getInfoUser(action) {
  try {
    const result = yield call(APIService.API_REQUEST, UrlUtils.api.userInfo, AuthHeader.loadAuthHeader(), {}, 'get')
    yield put(accountAction.getInfoUserSuccess(result.response))
  } catch (err) {
    yield put(accountAction.getInfoUserFail(err))
  }
}