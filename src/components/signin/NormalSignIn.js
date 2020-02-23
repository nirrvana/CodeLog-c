import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { postSignInData } from '../../redux/api';
import { signin } from '../../redux/action';
import TabNoBtn from '../../pages/TabNoBtn';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class NormalSignInForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, { email, password }) => {
      if (!err) {
        postSignInData(email, password)
          .then((res) => {
            if (res.status === 200) {
              this.props.handleSignin();
            }
          })
          .catch((err) => this.error());
      }
    });
  };

  error = () => {
    message.error('Invaild account');
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    if (this.props.isLogin) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <TabNoBtn></TabNoBtn>
          <div className="cl_SignInComponent">
            <Form onSubmit={this.handleSubmit} className="cl_SignInForm">
              <div className="cl_SignIn_header">Sign in</div>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="email"
                    className="cl_SignIn_DevInput"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your Password!' },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                    className="cl_SignIn_DevInput"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className="cl_SignIn_Checkbox">
                    Remember me
                  </Checkbox>,
                )}
                <Link to="">Forgot password</Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button cl_SignIn_Login_Btn"
                >
                  Login
                </Button>
                <br />
                <Link to="/SignUp" className="cl_SignIn_Register">
                  register now!
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
  }
}
NormalSignInForm = Form.create({ name: 'normal_login' })(NormalSignInForm);

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  handleSignin: () => {
    dispatch(signin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NormalSignInForm);
