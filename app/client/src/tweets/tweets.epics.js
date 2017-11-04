import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import { FETCH_USER_TWEETS, FETCH_USER_TWEETS_REJECTED } from './tweets.types';
import { fetchUserTweetsFulfilled } from './tweets.actions';

const fetchUserTweetsEpic = action$ =>
  action$.ofType(FETCH_USER_TWEETS).mergeMap(action =>
    ajax
      .getJSON(`http://localhost:3000/tweets?screen_name=${action.payload}`)
      .map(response => fetchUserTweetsFulfilled(response))
      .catch(error =>
        Observable.of({
          type: FETCH_USER_TWEETS_REJECTED,
          payload: error.xhr.response,
          error: true
        })
      )
  );

export default fetchUserTweetsEpic;
