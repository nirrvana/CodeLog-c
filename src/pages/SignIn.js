import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class SignIn extends Component {
  render() {
    return (
      <div>
        <div className="cl_SignIn">
          <div className="cl_SignIn_Title">CODE | LOG</div>
          <Button
            type="primary"
            className="cl_SignIn_Btn cl_SignIn_Developer_Btn"
          >
            <Link to="/DeveloperSignIn">Developer Sign In</Link>
          </Button>
          <Button
            type="primary"
            className="cl_SignIn_Btn cl_SignIn_Company_Btn"
          >
            <Link to="/CompanySignIn" className="">
              Company Sign In
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default SignIn;
