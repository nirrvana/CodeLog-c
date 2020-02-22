import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCompanySignInData } from '../../redux/api';
import { signin, isCompanyUser } from '../../redux/action';
import { Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  AutoComplete,
  message,
} from 'antd';
import TabNoBtn from '../../pages/TabNoBtn';

class CompanySignIn extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  error = () => {
    message.error('Invaild account');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      (err, { company_code, username, password }) => {
        if (!err) {
          postCompanySignInData(
            company_code === undefined ? '' : company_code,
            username,
            password,
          )
            .then((res) => {
              if (res.status === 200) {
                this.props.handleSignin();
                this.props.handleisCompanyUser();
              }
            })
            .catch((err) => this.error());
        }
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const token = document.cookie.slice(6);
    console.log('token', token);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    if (token) {
      return <Redirect to="/companymypage" />;
    } else {
      return (
        <div>
          <TabNoBtn></TabNoBtn>
          <div className="cl_SignInComponent">
            <Form
              {...formItemLayout}
              onSubmit={this.handleSubmit}
              className="cl_SignInForm"
            >
              <div className="cl_SignIn_header cl_SignIn_Company_header">
                Company Sign in
              </div>
              <Form.Item
                label={
                  <span>
                    company code&nbsp;
                    <Tooltip title="What's your company code?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('company_code', {
                  rules: [
                    {
                      required: false,
                      message: 'Please input your company code!',
                      whitespace: false,
                    },
                  ],
                })(<Input className="cl_SignIn_Company_Input" />)}
              </Form.Item>
              <Form.Item label="username">
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input username!' },
                  ],
                })(
                  <AutoComplete>
                    <Input className="cl_SignIn_Company_Input" />
                  </AutoComplete>,
                )}
              </Form.Item>
              <Form.Item label="password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password className="cl_SignIn_Company_Input" />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="cl_SignIn_Company_Login_Btn"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  handleSignin: () => {
    dispatch(signin());
  },
  handleisCompanyUser: () => {
    dispatch(isCompanyUser());
  },
});

const WrappedCompanySignIn = Form.create({ name: 'register' })(CompanySignIn);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedCompanySignIn);
