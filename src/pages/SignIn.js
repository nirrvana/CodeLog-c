import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
} from 'react-router-dom';

class SignIn extends Component {
  render() {
    if (!this.props.isLogin) {
      return (
        <Router>
          <Link to="/DeveloperSignIn">Developer Sign In</Link>
          <Link to="/CompanySignIn">Company Sign In</Link>
        </Router>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

export default connect(mapStateToProps)(SignIn);
