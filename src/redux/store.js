import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const rootReducers = combineReducers(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const rootMiddleware = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducers, rootMiddleware);
sagaMiddleware.run(rootSaga);

const ReduxComponent = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxComponent;
