import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const middlewares = [createLogger(), createEpicMiddleware(rootEpic)];

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
