//* Library
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//* File
import { currentPage } from '../redux/action';
//* CSS
import './SignUpPage.css';
import { Button } from 'antd';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <div className="cl_SignUp">
          <div className="cl_SignUp_Title">CODE | LOG</div>
          <Button
            type="primary"
            className="cl_SignUp_Btn cl_SignUp_Developer_Btn"
          >
            <Link to="/DeveloperSignUp">Developer Sign Up</Link>
          </Button>
          <Button
            type="primary"
            className="cl_SignUp_Btn cl_SignUp_Company_Btn"
          >
            <Link to="/CompanySignUp">Company Sign Up</Link>
          </Button>
          <Button
            type="primary"
            className="cl_SignUp_Btn cl_SignUp_Partner_Btn"
          >
            <Link to="/PartnerSignUp">Partner Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentPage: state.PostState.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePage: (page) => {
      dispatch(currentPage(page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
