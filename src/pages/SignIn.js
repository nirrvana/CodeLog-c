import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

// * component
import DeveloperSignIn from '../components/signin/DeveloperSignIn'
import CompanySignIn from '../components/company/';

class SignIn extends Component {
  render() {
    console.log(this.props.isLogin);
    if (!this.props.isLogin) {
      return (
        <Router>
          <Link to="/DeveloperSignIn">Developer Sign In</Link>
          <Link to="/CompanySignIn">Company Sign In</Link>
          <Route exact path="/DeveloperSignIn" component={DeveloperSignIn}></Route>
          <Route exact path="/CompanySignIn" component={CompanySignIn}></Route>
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
