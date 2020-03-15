import { takeEvery, takeLatest } from 'redux-saga/effects'
import { loginUser, getInfoUser } from './account.saga'
import { adminGetListPost, adminGetOnePost, getCategoryRoot, getCategoryChild } from './post.saga'

import { accountConstants } from '../_constants'
import { postConstants } from '../_constants'

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield takeEvery(accountConstants.LOGIN_REQUEST, loginUser)
  yield takeEvery(accountConstants.GET_INFO_REQUEST, getInfoUser)
  yield takeLatest(postConstants.ADMIN_GET_POSTS_REQUEST, adminGetListPost)
  yield takeLatest(postConstants.ADMIN_GET_ONE_POST_REQUEST, adminGetOnePost)
  yield takeLatest(postConstants.GET_CATEGORY_ROOT_REQUEST, getCategoryRoot)
  yield takeLatest(postConstants.GET_CATEGORY_CHILD_REQUEST, getCategoryChild)
}

export default rootSaga;