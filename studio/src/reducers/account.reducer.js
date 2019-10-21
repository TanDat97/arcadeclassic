/*
 *
 * Account reducer
 *
 */

import { accountConstants } from '../constants/account.constant';

export const initialState = fromJS({
  authenticated: 'unauthorized',
});

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountConstants.DEFAULT_ACTION:
      return state;
    case accountConstants.LOGIN_REQUEST:
      return state.set('authenticated', 'loading');
    case accountConstants.LOGIN_SUCCESS:
      return state.set('authenticated', 'success');
    case accountConstants.LOGIN_FAILURE:
      return state.set('authenticated', 'fail');
    default:
      return state;
  }
}

export default accountReducer;