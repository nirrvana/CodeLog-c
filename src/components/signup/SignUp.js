/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { HashRouter as Router, Redirect } from 'react-router-dom';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
// import { actionCreators } from '../../store';

const AutoCompleteOption = AutoComplete.Option;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      isSignUp: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.addToDo(values);
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
  handleRegisterBtnOnClick() {
    this.setState({ isSignUp: true });
  }
  render() {
    console.log(this.state.isSignUp);
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
    if (this.state.isSignUp) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="cl_SignUpComponent">
        <Form
          className="cl_SignUpForm"
          {...formItemLayout}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="E-mail">
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
            })(<Input />)}
          </Form.Item>
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
            })(<Input.Password />)}
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
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Website">
            {getFieldDecorator('website', {
              rules: [{ required: false, message: 'Please input website!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="website"
              >
                <Input />
              </AutoComplete>,
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => this.handleRegisterBtnOnClick()}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        {/* 리덕스의 state를 mapStateToProps를 이용해 props로 만들어서 받아서 사용할 수 있다? */}
        {/* <div>{JSON.stringify(this.props.SignupState)}</div> */}
      </div>
    );
  }
}

// ! redux
// // ? 스토어에 있는 스테이트에 새로운 사항을 매핑? constructor 같은 맥락?
// function mapStateToProps(state) {
//   return { SignupState: state };
// }
// // ? 해당 함수를 props로 보낸다. super 같은 맥락?, state를 변경한다.
// // ! dispatch는 action을 reducer로 전달해준다.
// function mapDispatchToProps(dispatch) {
//   return {
//     addToDo: (text) => dispatch(actionCreators.addToDo(text)),
//     /**
//      * actionCreators.handleRegisterBtnOnClick(boolean) => type,boolean 값을 가진 객체를 반환 === action
//      * dispatch는 위의 action을 reducer에 전달
//      * reducer는 action type에 맞는 작업을 실행하고 boolean 값으로 스테이트를 변경한다.
//      */
//     handleRegisterBtnOnClick: (boolean) =>
//       dispatch(actionCreators.handleRegisterBtnOnClick(boolean)),
//   };
// }

// // ! 현재 컴포넌트에서 프롭스로 스토어의 스테이트를 받아서 쓰겠다.
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Form.create({ name: 'register' })(SignUp));

export default Form.create({ name: 'register' })(SignUp);
