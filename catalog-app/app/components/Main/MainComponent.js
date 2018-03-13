import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'components';
import { withRouter } from 'react-router-dom';
import { container, innerContainer } from './styles.css';

class MainContainer extends Component {
  state = {
    isAuthed: false,
  };
  render() {
    return (
      <div className={container}>
        <Navigation isAuthed={this.state.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(MainContainer);
