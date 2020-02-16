/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { postSignInData } from '../../redux/api';
import { signin } from '../../redux/action';
import { Link, Route } from 'react-router-dom';
import SignUp from '../../pages/SignUpPage';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

class NormalSignInForm extends React.Component {
  error = () => {
    message.error('Invaild account');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, { email, password }) => {
      console.log(email, password);
      if (!err) {
        postSignInData(email, password)
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              this.props.handleSignin();
            }
          })
          .catch((err) => {
            this.error();
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/SignUp">register now!</Link>
        </Form.Item>
      </Form>
    );
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
