/* eslint-disable jsx-a11y/anchor-is-valid */
// * Library
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// * Import file
import serverURL from '../../serverURL';
// * CSS
import { message, Form, Input, Checkbox, Button, AutoComplete } from 'antd';

const AutoCompleteOption = AutoComplete.Option;
var isPartner = '';
function onChange(e) {
  isPartner = e.target.checked;
}

class CompanySignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isSignUp: false,
    };
  }

  error = () => {
    message.error('exist email. please enter other email.');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios
          .post(`${serverURL}/signup`, {
            email: values.email,
            password: values.password,
            username: values.Username,
            companyid: undefined,
            rank: undefined,
            completion: undefined,
            website: values.website,
          })
          .then((res) => {
            if (res.status === 200) {
              this.setState({ isSignUp: true });
            }
          })
          .catch((err) => {
            this.error();
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

    let AccessDisplay = 'none';
    if (isPartner) {
      AccessDisplay = '';
    }
    if (!this.state.isSignUp) {
      return (
        <div className="cl_SignUpComponent">
          <Form
            className="cl_SignUpForm"
            {...formItemLayout}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label={<span>Corporate name&nbsp;</span>}>
              {getFieldDecorator('Corporate name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input corporate name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>Company name&nbsp;</span>}>
              {getFieldDecorator('company name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input company name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Corp Website">
              {getFieldDecorator('website', {
                rules: [{ required: true, message: 'Please input website!' }],
              })(
                <AutoComplete
                  dataSource={websiteOptions}
                  onChange={this.handleWebsiteChange}
                >
                  <Input />
                </AutoComplete>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('isPartner', {
                valuePropName: 'checked',
              })(
                <Checkbox onChange={onChange}>
                  Are you a partner company?
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item
              label={<span>Access code&nbsp;</span>}
              style={{ display: AccessDisplay }}
            >
              {getFieldDecorator('Access code', {
                rules: [
                  {
                    required: !AccessDisplay,
                    message: 'Please input access code!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
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
      );
    } else {
      return <Redirect to="/"></Redirect>;
    }
  }
}
export default Form.create({ name: 'register' })(CompanySignUp);
