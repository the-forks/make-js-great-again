import { FETCH_USER_TWEETS, FETCH_USER_TWEETS_FULFILLED } from './tweets.types';

export const fetchUserTweets = username => ({
  type: FETCH_USER_TWEETS,
  payload: username
});

export const fetchUserTweetsFulfilled = payload => ({
  type: FETCH_USER_TWEETS_FULFILLED,
  payload
});
