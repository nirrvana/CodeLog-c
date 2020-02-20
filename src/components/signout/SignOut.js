import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postSignOut } from '../../redux/api';
import { signout } from '../../redux/action';

class SignOut extends Component {
  componentDidMount() {
    localStorage.clear();
    this.props.handleSignOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSignOut: () => {
    postSignOut()
      .then((res) => dispatch(signout()))
      .catch((err) => dispatch(signout()));
  },
});

export default connect(null, mapDispatchToProps)(SignOut);
