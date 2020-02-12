/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
// * redux
import { postSignInData } from '../../redux/api';
import { signin } from '../../redux/action';

class NormalSignInForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, { email, password }) => {
      console.log(email, password);
      if (!err) {
        postSignInData(email, password)
          .then((res) => {
            if (res.status === 200) {
              this.props.handleSignin();
            }
          })
          .catch((err) => {
            window.alert('로그인에 실패하였습니다.');
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
          Or <a href="">register now!</a>
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
