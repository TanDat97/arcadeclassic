import {
  call,
  put
} from 'redux-saga/effects'
import {
  postAction
} from '_actions'

import APIService from 'utils/APIService'
import UrlUtils from 'utils/UrlUtils'
import AuthHeader from 'utils/AuthHeader'

export function* adminGetListPost(action) {
  try {
    const result = yield call(APIService.API_REQUEST, UrlUtils.admin.getListPostFilter, AuthHeader.loadAuthHeader(), action.data, 'post')
    yield put(postAction.adminGetPostsSuccess(result.response))
  } catch (err) {
    
    yield put(postAction.adminGetPostsFail())
  }
}