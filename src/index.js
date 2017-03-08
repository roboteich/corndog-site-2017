import 'babel-polyfill';
import React from 'react';
import { render } from 'react-snapshot';
import { Provider } from 'react-redux';
import Root from './containers/Root';
import configureStore from './configureStore';
import './styles/main.css';

const store = configureStore();

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
