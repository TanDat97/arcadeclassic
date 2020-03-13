import {
  call,
  put,
  select
} from 'redux-saga/effects'
import {
  postAction
} from '_actions'
import Utils from 'utils/Utils'

import APIService from 'utils/APIService'
import UrlUtils from 'utils/UrlUtils'
import AuthHeader from 'utils/AuthHeader'

export function* adminGetListPost(action) {
  try {
    const result = yield call(APIService.API_REQUEST, UrlUtils.admin.getListPostFilter, AuthHeader.loadAuthHeader(), action.data, 'post')
    yield put(postAction.adminGetPostsSuccess(result.response))
  } catch (err) {
    yield put(postAction.adminGetPostsFail(err))
  }
}

export function* getCategoryRoot(action) {
  try {
    const state = yield select()
    const key = Utils.mapKeyForState({url: UrlUtils.admin.getCategoryRoot, method: 'get'})
    
    if(action.data.useCache && state.post.cache[key]) {
      // console.log(state.post.cache[key])
      yield put(postAction.getCategoryRootSuccess(state.post.cache[key]))
    } else {
      const result = yield call(APIService.API_REQUEST, UrlUtils.admin.getCategoryRoot, AuthHeader.loadAuthHeader(), {}, 'get')
      yield put(postAction.getCategoryRootSuccess(result.response))
      if (action.data.useCache) {
        yield put (postAction.saveCache(key, result.response))
      }
    }
  } catch (err) {
    yield put(postAction.getCategoryRootFail(err))
  }
}