import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// *component
import NormalSignIn from '../components/signin/NormalSignIn';
import GithubSignIn from '../components/signin/GithubSignIn';

class SignIn extends Component {
  render() {
    if (this.props.isLogin) {
      return <Redirect to="/MyPage" />;
    } else {
      return (
        <div>
          <NormalSignIn />
          <GithubSignIn />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

export default connect(mapStateToProps)(SignIn);
