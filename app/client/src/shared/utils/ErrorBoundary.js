import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = { hasError: false };

  componentDidCatch = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return <h1>Sorry, something went wrong :(</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
