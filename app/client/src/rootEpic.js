import { combineEpics } from 'redux-observable';
import { tweetsEpics } from './tweets';

export default combineEpics(tweetsEpics);
