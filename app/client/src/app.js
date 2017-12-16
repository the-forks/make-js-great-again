import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { TweetsApp } from './tweets/';
import ErrorBoundary from './shared/utils/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <TweetsApp />
    </Provider>
  </ErrorBoundary>
);

render(<App />, document.getElementById('app'));
