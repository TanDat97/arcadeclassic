import { combineReducers } from 'redux'

import account from './account.reducer'
import post from './post.reducer'

const rootReducers = combineReducers({
  account,
  post,
})

export default rootReducers
