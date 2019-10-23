import { takeEvery } from 'redux-saga/effects'
import { loginUser, getInfoUser } from './account.saga'
import { accountConstants } from '../constants'

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield takeEvery(accountConstants.LOGIN_REQUEST, loginUser)
  yield takeEvery(accountConstants.GET_INFO_REQUEST, getInfoUser)
}

export default rootSaga;