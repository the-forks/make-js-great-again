import { createSelector } from 'reselect';

export const currentUserSelector = createSelector(
  state => state.app.currentUser,
  currentUser => currentUser
);

export const tweetsSelector = createSelector(
  state => state.app.tweets,
  tweets => tweets
);

export const isLoadingSelector = createSelector(
  state => state.app.isLoading,
  isLoading => isLoading
);
