import { combineReducers } from 'redux'

import account from './account.reducer'
import post from './post.reducer'
import cache from './cache.reducer'

const rootReducers = combineReducers({
  account,
  post,
  cache,
})

export default rootReducers
