import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

// * component
import DeveloperSignIn from '../components/signin/DeveloperSignIn';
import CompanySignIn from '../components/company/CompanySignIn';

class SignIn extends Component {
  render() {
    const token = document.cookie.slice(6);
    console.log('token', token);
    if (!token) {
      return (
        <div>
          <Link to="/DeveloperSignIn">Developer Sign In</Link>
          <Link to="/CompanySignIn">Company Sign In</Link>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default SignIn;
