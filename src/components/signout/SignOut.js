import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signout } from '../../redux/action';

class SignOut extends Component {
  componentDidMount() {
    const name = document.cookie.slice(0, 5);
    console.log(1, name);
    this.RemoveCookie(name);
    this.props.handleSignOut();
  }

  RemoveCookie = (name) => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = `${name} =; expires=${date}`;
  };

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleSignOut: () => {
    dispatch(signout());
  },
});

export default connect(null, mapDispatchToProps)(SignOut);
