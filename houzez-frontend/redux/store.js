import {
  createStore,
  applyMiddleware
} from 'redux'
import { combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

// !IMPORTANT: Import list reducers
import home from './reducers/home'
import notification from './reducers/notification'
import dialog from './reducers/dialog'
import user from './reducers/user'
import category from './reducers/category'

// !IMPORTANT: define reducers
const rootReducer = combineReducers({
  home,
  notification,
  user,
  category,
})

let middleware = []
if (process.env.NODE_ENV !== 'production') {
  // Dev tool support (console debug)
  const loggerMiddleware = createLogger()
  // middleware = [loggerMiddleware]
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, ...middleware)
)

export default store;
