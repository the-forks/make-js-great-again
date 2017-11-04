import {
  CLINTON_USER_NAME,
  FETCH_USER_TWEETS,
  FETCH_USER_TWEETS_FULFILLED,
  FETCH_USER_TWEETS_REJECTED
} from './tweets.types';

export default (
  state = { currentUser: CLINTON_USER_NAME, tweets: [], isLoading: false },
  action
) => {
  switch (action.type) {
    case FETCH_USER_TWEETS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: true
      };

    case FETCH_USER_TWEETS_FULFILLED:
      return {
        ...state,
        tweets: [...action.payload],
        isLoading: false
      };

    case FETCH_USER_TWEETS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: true
      };

    default:
      return state;
  }
};
