import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postSignOut } from '../../redux/api';
import { signout, isCompanyUser } from '../../redux/action';

class SignOut extends Component {
  componentDidMount() {
    localStorage.clear();
    this.props.handleSignOut();
    this.props.handleisCompanyUser(false);
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
  handleisCompanyUser: (boolean) => {
    dispatch(isCompanyUser(boolean));
  },
});

export default connect(null, mapDispatchToProps)(SignOut);
