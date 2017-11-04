import { combineReducers } from 'redux';
import { tweetsReducers } from './tweets';

export default combineReducers({ app: tweetsReducers });
