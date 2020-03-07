import { combineReducers } from 'redux';

import account from './account.reducer';

const rootReducers = combineReducers({
  account,
})

export default rootReducers;
