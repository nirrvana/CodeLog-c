/* eslint-disable jsx-a11y/anchor-is-valid */
// * Library
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// * Import file
import TabNoBtn from '../../pages/TabNoBtn';
import { postCompanySignUpData } from '../../redux/api';

// * CSS
import {
  message,
  Form,
  Input,
  Checkbox,
  Button,
  AutoComplete,
  Collapse,
} from 'antd';
const { Panel } = Collapse;

const AutoCompleteOption = AutoComplete.Option;

class CompanySignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isSignUp: false,
      isPartner: false,
    };
  }

  error = () => {
    message.error('exist email. please enter other email.');
  };
  onChange = (e) => {
    this.setState({ isPartner: e.target.checked });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // postCompanySignUpData(
        //   values.CorporateName,
        //   values.companyName,
        //   values.website,
        //   values.isPartner,
        //   values.AccessCode,
        //   values.agreement,
        // )
        //   .then((res) => {
        //     if (res.status === 200) {
        //       this.setState({ isSignUp: true });
        //     }
        //   })
        //   .catch((err) => {
        //     this.error();
        //   });
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
  callback = (key) => {
    console.log(key);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult, isPartner } = this.state;

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
        <div>
          <TabNoBtn></TabNoBtn>
          <div className="cl_SignUpComponent">
            <Form
              className="cl_SignUpForm"
              {...formItemLayout}
              onSubmit={this.handleSubmit}
            >
              <div className="cl_SignUp_header">Company Sign up</div>
              <Form.Item label={<span>Corporate name&nbsp;</span>}>
                {getFieldDecorator('coperate_name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input corporate name!',
                      whitespace: true,
                    },
                  ],
                })(<Input className="cl_SignUp_Input" />)}
              </Form.Item>
              <Form.Item label={<span>Business name&nbsp;</span>}>
                {getFieldDecorator('business_name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input company name!',
                      whitespace: true,
                    },
                  ],
                })(<Input className="cl_SignUp_Input" />)}
              </Form.Item>
              <Form.Item label={<span>Business license number&nbsp;</span>}>
                {getFieldDecorator('eid', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input Business license number!',
                      whitespace: true,
                    },
                  ],
                })(<Input className="cl_SignUp_Input" />)}
              </Form.Item>
              <Form.Item label="Corp Website">
                {getFieldDecorator('website', {
                  rules: [{ required: true, message: 'Please input website!' }],
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                  >
                    <Input className="cl_SignUp_Input" />
                  </AutoComplete>,
                )}
              </Form.Item>
              <Form.Item label="Member">
                {getFieldDecorator('member', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input member information!',
                    },
                  ],
                })(
                  <div
                    {...formItemLayout}
                    className="cl_SignUp_Member"
                    onSubmit={this.handleSubmit}
                  >
                    <Collapse defaultActiveKey={['0']} onChange={this.callback}>
                      <Panel
                        header="Write member Info"
                        key="1"
                        className="cl_SignUp_Member_Panel"
                      >
                        <Form.Item
                          {...formItemLayout}
                          hasFeedback
                          label={<span>Name&nbsp;</span>}
                          {...formItemLayout}
                        >
                          {getFieldDecorator('username', {
                            rules: [
                              {
                                required: true,
                                message: 'Please input your name!',
                                whitespace: true,
                              },
                            ],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item
                          {...formItemLayout}
                          hasFeedback
                          label={<span>Position&nbsp;</span>}
                        >
                          {getFieldDecorator('position', {
                            rules: [
                              {
                                required: true,
                                message: 'Please input your position!',
                                whitespace: true,
                              },
                            ],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item
                          label="E-mail"
                          onChange={this.handleEmail}
                          hasFeedback
                          {...formItemLayout}
                        >
                          {getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: 'Invalid E-mail!',
                              },
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item
                          label="Password"
                          hasFeedback
                          {...formItemLayout}
                        >
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
                          })(<Input.Password />)}
                        </Form.Item>

                        <Form.Item
                          label="Confirm"
                          hasFeedback
                          {...formItemLayout}
                        >
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
                            <Input.Password onBlur={this.handleConfirmBlur} />,
                          )}
                        </Form.Item>
                      </Panel>
                    </Collapse>
                  </div>,
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('isPartner', {
                  valuePropName: 'checked',
                })(
                  <Checkbox onChange={this.onChange}>
                    Are you a partner company?
                  </Checkbox>,
                )}
              </Form.Item>
              <Form.Item
                label={<span>Access code&nbsp;</span>}
                style={{ display: AccessDisplay }}
              >
                {getFieldDecorator('AccessCode', {
                  rules: [
                    {
                      required: !AccessDisplay,
                      message: 'Please input access code!',
                      whitespace: true,
                    },
                  ],
                })(<Input className="cl_SignUp_Input" />)}
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
    } else {
      return <Redirect to="/"></Redirect>;
    }
  }
}
export default Form.create({ name: 'register' })(CompanySignUp);
