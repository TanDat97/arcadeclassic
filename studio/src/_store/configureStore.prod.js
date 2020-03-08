import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../_reducers';
import rootSaga from '../_sagas';

import { accountConstants } from '../_constants'
import Utils from 'utils/Utils'

const sagaMiddleware = createSagaMiddleware();

const saveAuth = store => next => action => {
  if(action.type === accountConstants.LOGIN_SUCCESS || action.type === accountConstants.LOGOUT) {
    // after a successful login, update the token in the API
    Utils.setAccount({user_token: action.user_token, user_scope: action.user_scope});
  }

  // continue processing this action
  return next(action);
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, saveAuth))
    );
  sagaMiddleware.run(rootSaga);
  return store;
}