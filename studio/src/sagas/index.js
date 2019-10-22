import { takeEvery } from 'redux-saga/effects'
import { loginUser } from './account.saga'
import { accountConstants } from '../constants'

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield takeEvery(accountConstants.LOGIN_REQUEST, loginUser)
  
}

export default rootSaga;