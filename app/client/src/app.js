import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { TweetsApp } from './tweets/';

render(
  <Provider store={store}>
    <TweetsApp />
  </Provider>,
  document.getElementById('app')
);
