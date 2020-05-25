import {
  call,
  put,
  select
} from 'redux-saga/effects'
import {
  postAction,
  cacheAction
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

export function* adminGetOnePost(action) {
  try {
    const result = yield call(APIService.API_REQUEST, `${UrlUtils.admin.getOnePost}/${action.data.post_id}`, AuthHeader.loadAuthHeader(), {}, 'get')
    yield put(postAction.adminGetOnePostSuccess(result.response))
  } catch (err) {
    yield put(postAction.adminGetOnePostsFail(err))
  }
}

export function* getCategoryRoot(action) {
  try {
    const state = yield select()
    const key = Utils.mapKeyForState({
      url: UrlUtils.admin.getCategoryRoot,
      method: 'get'
    })
    if (action.data.useCache && state.cache.category[key]) {
      yield put(postAction.getCategoryRootSuccess(state.cache.category[key]))
    } else {
      const result = yield call(APIService.API_REQUEST, UrlUtils.admin.getCategoryRoot, AuthHeader.loadAuthHeader(), {}, 'get')
      yield put(postAction.getCategoryRootSuccess(result.response))
      if (action.data.useCache) {
        yield put(cacheAction.saveCacheCategory(key, result.response))
      }
    }
  } catch (err) {
    yield put(postAction.getCategoryRootFail(err))
  }
}

export function* getCategoryChild(action) {
  try {
    const state = yield select()
    const key = Utils.mapKeyForState({
      url: UrlUtils.admin.getCategoryChild,
      method: 'get',
      data: action.data.id
    })
    if (action.data.useCache && state.cache.category[key]) {
      yield put(postAction.getCategoryChildSuccess(state.cache.category[key]))
    } else {
      const result = yield call(APIService.API_REQUEST, `${UrlUtils.admin.getCategoryChild}/${action.data.id}`, AuthHeader.loadAuthHeader(), {}, 'get')
      yield put(postAction.getCategoryChildSuccess(result.response))
      if (action.data.useCache) {
        yield put(cacheAction.saveCacheCategory(key, result.response))
      }
    }
  } catch (err) {
    yield put(postAction.getCategoryChildFail(err))
  }
}