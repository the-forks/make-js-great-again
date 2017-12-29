import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardActions,
  CardTitle,
  CircularProgress,
  List,
  ListItem,
  Media,
  MediaOverlay
} from 'react-md';

import {
  CLINTON_USER_NAME,
  TRUMP_USER_NAME,
  CLINTON_IMG,
  TRUMP_IMG
} from './tweets.types';

import {
  currentUserSelector,
  tweetsSelector,
  isLoadingSelector
} from './tweets.selectors';

import { fetchUserTweets } from './tweets.actions';

class TweetsContainer extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetchTweets: PropTypes.func.isRequired,
    currentUser: PropTypes.string.isRequired,
    tweets: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  componentDidMount() {
    this.props.fetchTweets(CLINTON_USER_NAME);
  }

  handleSwitchView = () => {
    const { currentUser, fetchTweets } = this.props;
    return currentUser === CLINTON_USER_NAME
      ? fetchTweets(TRUMP_USER_NAME)
      : fetchTweets(CLINTON_USER_NAME);
  };

  render() {
    const { currentUser, tweets, isLoading } = this.props;
    return (
      <Card style={{ maxWidth: 550 }} className="md-block-centered">
        <Media>
          <img
            src={currentUser === CLINTON_USER_NAME ? CLINTON_IMG : TRUMP_IMG}
            alt="presentation"
            role="presentation"
          />
          <MediaOverlay>
            <CardTitle title={`${currentUser}'s`} subtitle="Latest Tweets" />
          </MediaOverlay>
        </Media>
        <List>
          {isLoading ? (
            <CircularProgress id="unique" scale={3} />
          ) : (
            !!tweets &&
            tweets.map(({ id, text }) => (
              <ListItem key={id} primaryText={text} title={text} />
            ))
          )}
        </List>
        <CardActions className="md-divider-border md-divider-border--top">
          <Button raised primary onClick={this.handleSwitchView}>
            Switch View
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  tweets: tweetsSelector(state),
  isLoading: isLoadingSelector(state)
});

const mapDispatchToProps = { fetchTweets: fetchUserTweets };

export default connect(mapStateToProps, mapDispatchToProps)(TweetsContainer);
