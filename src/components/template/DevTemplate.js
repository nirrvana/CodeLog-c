import React from 'react';
// * redux
import { postDevPost } from '../../redux/api';
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

class DevTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag_list: ['react', 'redux', 'hooks'],
      selected_tag_list: [],
    };
  }

  check = () => {
    this.props.form.validateFields(
      (
        err,
        {
          title,
          ProjectConcept,
          CodingStrategy,
          CodingDifficulty,
          Reference,
          Lesson,
        },
      ) => {
        if (!err) {
          const { selected_tag_list } = this.state;
          console.info(
            'success',
            title,
            ProjectConcept,
            CodingStrategy,
            CodingDifficulty,
            Reference,
            Lesson,
            selected_tag_list,
          );
          postDevPost(
            title,
            ProjectConcept,
            CodingStrategy,
            CodingDifficulty,
            Reference,
            Lesson,
            selected_tag_list,
          );
        }
      },
    );
  };

  selectTag = (e) => {
    const selected_tag = e.target.innerText;
    if (!this.state.selected_tag_list.includes(selected_tag)) {
      e.target.className = 'ant-tag ant-tag-blue';
      this.setState({
        selected_tag_list: this.state.selected_tag_list.concat(selected_tag),
      });
      console.log(this.state.selected_tag_list);
    } else {
      e.target.className = 'ant-tag';
      this.setState({
        selected_tag_list: this.state.selected_tag_list.filter(
          (tag) => tag !== selected_tag,
        ),
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
        <Form.Item {...formItemLayout} label="ProjectConcept">
          {getFieldDecorator('ProjectConcept', {
            rules: [],
          })(
            <TextArea
              placeholder="구현하고자 하는 기능/과제/프로젝트에 대한 설명"
              rows={14}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="CodingStrategy">
          {getFieldDecorator('CodingStrategy', {
            rules: [],
          })(<TextArea placeholder="구현을 위한 코딩 전략" rows={14} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="CodingDifficulty">
          {getFieldDecorator('CodingDifficulty', {
            rules: [],
          })(
            <TextArea
              placeholder="진행 중에 겪은 에러, 에러코드, 어려움"
              rows={14}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Reference">
          {getFieldDecorator('Reference', {
            rules: [],
          })(
            <TextArea
              placeholder="에러를 해결하기 위하여 찾은 키워드 및 레퍼런스"
              rows={14}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="Lesson">
          {getFieldDecorator('Lesson', {
            rules: [],
          })(
            <TextArea
              placeholder="기능구현 및 에러해결을 통해 얻은 교훈"
              rows={14}
            />,
          )}
        </Form.Item>
        <div>
          해시태그를 선택해주세요.
          <br />
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
const WrappedDevTemplate = Form.create({ name: 'dynamic_rule' })(DevTemplate);
export default WrappedDevTemplate;
