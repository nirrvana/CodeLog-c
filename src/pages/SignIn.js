import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  render() {
    return (
      <div>
        <Link to="/DeveloperSignIn">Developer Sign In</Link>
        <Link to="/CompanySignIn">Company Sign In</Link>
      </div>
    );
  }
}

export default SignIn;
