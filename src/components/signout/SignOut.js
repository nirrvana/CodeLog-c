import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postSignOut } from '../../redux/api';
import { signout } from '../../redux/action';

class SignOut extends Component {
  componentDidMount() {
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
      .catch((err) => {
        const token = document.cookie.slice(0, 5);
        let date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `${token} =; expires=${date}`;
        dispatch(signout());
      });
  },
});

export default connect(null, mapDispatchToProps)(SignOut);
