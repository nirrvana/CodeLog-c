/* eslint-disable jsx-a11y/anchor-is-valid */
// * Library
import React, { Component } from 'react';
// * Import file
import TabNoBtn from '../../pages/TabNoBtn';
import { postSignUpData, postEmailDuplicate } from '../../redux/api';
// * CSS
import {
  message,
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  AutoComplete,
  Upload,
} from 'antd';

const AutoCompleteOption = AutoComplete.Option;

class DeveloperSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleEmailValid = () => {
    postEmailDuplicate(String(this.state.email))
      .then((res) => {
        message.success('This email is usable!');
      })
      .catch((err) => {
        message.error('exist email. please enter other email.');
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        postSignUpData(
          values.email,
          values.password,
          values.username,
          values.personal_homepage,
        )
          .then((res) => {
            if (res.status === 200) {
              message.success('Welcome to the membership !');
              this.props.history.push('/');
            }
          })
          .catch((err) => {
            message.error('exist email. please enter other email.');
          });
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        (domain) => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    const websiteOptions = autoCompleteResult.map((website) => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div>
        <TabNoBtn></TabNoBtn>
        <div className="cl_SignUpComponent">
          <Form
            className="cl_SignUpForm"
            {...formItemLayout}
            onSubmit={this.handleSubmit}
          >
            <div className="cl_SignUp_header">Sign up</div>

            <Form.Item
              label={
                <span>
                  User name&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your user name!',
                    whitespace: true,
                  },
                ],
              })(<Input className="cl_SignUp_DevInput" />)}
            </Form.Item>

            <Form.Item
              className="cl_Email_Form"
              label="E-mail"
              onChange={this.handleEmail}
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input className="cl_SignUp_DevInput" />)}
            </Form.Item>
            <Button
              className="cl_Email_Duplicate"
              onClick={this.handleEmailValid}
            >
              Check email
            </Button>
            <Form.Item label="Password" hasFeedback>
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
              })(<Input.Password className="cl_SignUp_DevInput" />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input.Password
                  onBlur={this.handleConfirmBlur}
                  className="cl_SignUp_DevInput"
                />,
              )}
            </Form.Item>

            <Form.Item label="Personal homepage">
              {getFieldDecorator('personal_homepage', {
                rules: [
                  {
                    required: false,
                    message: 'Please input personal homepage!',
                  },
                ],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                  placeholder="website"
                >
                  <Input className="cl_SignUp_DevInput" />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item label="Completion">
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>,
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'register' })(DeveloperSignUp);
