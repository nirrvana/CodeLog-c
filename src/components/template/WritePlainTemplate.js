import React from 'react';
// * redux
import { postPlainPost } from '../../redux/api';
// * antd
import { Form, Input, Tag, Button } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 15 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class WritePlainTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag_list: ["react", "redux", "hooks"],
      selected_tag_list: []
    };
  }

  check = () => {
    this.props.form.validateFields((err, { title, content }) => {
      if (!err) {
        const { selected_tag_list } = this.state;
        console.info('success', title, content, selected_tag_list);
        postPlainPost(title, content, selected_tag_list);
      }
    });
  };

  selectTag = ({ target: { innerText: selected_tag } }) => {
    console.log(selected_tag);
    if (!this.state.selected_tag_list.includes(selected_tag)) {
      this.setState({
        selected_tag_list: this.state.selected_tag_list.concat(selected_tag)
      });
      console.log(this.state.selected_tag_list);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form.Item {...formItemLayout} label="title">
          {getFieldDecorator('title', {
            rules: [],
          })(<Input placeholder="Please input post title" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="content">
          {getFieldDecorator('content', {
            rules: [],
          })(<TextArea placeholder="Please input post content" rows={14} />)}
        </Form.Item>
        <div>
          {this.state.hashtag_list.map((tag) => (
            <Tag onClick={this.selectTag}>{tag}</Tag>
          ))}
        </div>
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            post!
          </Button>
        </Form.Item>
      </div>
    );
  }
}
const WrappedWritePlainTemplate = Form.create({ name: 'dynamic_rule' })(
  WritePlainTemplate,
);
export default WrappedWritePlainTemplate;
