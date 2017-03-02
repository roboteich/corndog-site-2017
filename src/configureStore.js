import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
// import createLogger from 'redux-logger';
import corndogApp from './reducers';

const configureStore = () => {
  const middlewares = [promise, thunk];
 //  if (process.env.NODE_ENV !== 'production') {
 //   middlewares.push(createLogger());
 // }
  return createStore(corndogApp, applyMiddleware(...middlewares));
}

export default configureStore;
