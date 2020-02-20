import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//* redux
import { connect } from 'react-redux';
import { getTags, postDevPost } from '../../redux/api';
import { currentPost } from '../../redux/action';
//* library
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import CodeBlock from '../postedit/CodeBlock';
import debounce from 'lodash.debounce';
//* css
import { Tag, Input, Button, Avatar, List, message, Modal } from 'antd';

class DevTemplate extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'dev',
      title: '',
      project_concept: '',
      coding_strategy: '',
      occurred_error: '',
      reference: '',
      lesson: '',
      tags: [],
      selected_tags: [],
      visible: false,
      isPosted: false,
    };
    this.handleDebounceInputChange = debounce(
      this.handleDebounceInputChange,
      1000,
    );
  }

  componentDidMount() {
    getTags()
      .then(({ data: { tags } }) =>
        this.setState({
          tags,
        }),
      )
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));

    this.checkData();
  }

  checkData = () => {
    const saved = JSON.parse(localStorage.getItem('dev'));
    if (saved) {
      this.setState({ visible: true });
    }
  };

  getData = (e) => {
    const saved = JSON.parse(localStorage.getItem('dev'));
    if (saved) {
      const { title, content, selected_tags } = saved;
      this.setState({
        visible: false,
        title,
        content,
        selected_tags,
      });
    }
  };

  dropData = (e) => {
    this.setState({
      visible: false,
    });
    localStorage.removeItem('dev');
  };

  handleInputChange = (state) => ({ target: { value: input } }) => {
    this.setState({
      [state]: input,
    });
    this.handleDebounceInputChange();
  };

  handleDebounceInputChange = () => {
    const { theme, title, content, selected_tags } = this.state;
    localStorage.setItem(
      theme,
      JSON.stringify({ title, content, selected_tags }),
    );
  };

  selectTag = (e) => {
    const { selected_tags } = this.state;
    const target = e.target.innerText;

    if (!selected_tags.includes(target)) {
      e.target.className = 'ant-tag-blue';
      this.setState({
        selected_tags: [...selected_tags, target],
      });
    } else {
      e.target.className = '';
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== target),
      });
    }
    this.handleDebounceInputChange('selected_tags');
  };

  handleSubmit = (e) => {
    const {
      theme,
      title,
      project_concept,
      coding_strategy,
      occurred_error,
      reference,
      lesson,
      selected_tags,
    } = this.state;

    const content = `${project_concept}${coding_strategy}${occurred_error}${reference}${lesson}`;
    postDevPost(theme, title, content, selected_tags)
      .then(({ data: { id } }) => {
        this.props.handlePost(id);
        message.success('Post successfully!');
        this.setState({ isPosted: true });
        localStorage.removeItem('dev');
      })
      .catch((err) => message.error('Fail to post..'));
  };

  render() {
    const {
      title,
      project_concept,
      coding_strategy,
      occurred_error,
      reference,
      lesson,
      tags,
      selected_tags,
      visible,
      isPosted,
    } = this.state;
    if (isPosted) {
      return <Redirect to="DevPost" />;
    } else {
      return (
        <div>
          <Modal
            title="confirm"
            visible={visible}
            onOk={this.getData}
            onCancel={this.dropData}
          >
            <p>Would you like to go to what you were working on?</p>
          </Modal>
          <div className="cl_Post">
            <Input
              className="cl_Edit_Title cl_Post_set "
              type="text"
              onChange={this.handleInputChange('title')}
              value={title}
              placeholder="title"
            />
            <div className="cl_Post_author_Info cl_Post_set ">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <div className="cl_Post_author">Root</div>
            </div>
            <div className="cl_Post_Contents ">
              <div className="cl_Post_Edit_Subtitle ">Project concept</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('project_concept')}
                  defaultValue={project_concept}
                  placeholder="구현하고자 하는 기능/과제/프로젝트에 대한 설명"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={project_concept}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Coding strategy</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('coding_strategy')}
                  defaultValue={coding_strategy}
                  placeholder="구현을 위한 코딩 전략"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={coding_strategy}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Occurred error</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('occurred_error')}
                  defaultValue={occurred_error}
                  placeholder="진행 중 겪은 에러/에러코드/어려움"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={occurred_error}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Reference</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('reference')}
                  defaultValue={reference}
                  placeholder="에러를 해결하기 위해 찾아본 키워드 및 레퍼런스"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={reference}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Lesson</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('lesson')}
                  defaultValue={lesson}
                  placeholder="기능구현 및 에러해결을 통해 얻은 교훈"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={lesson}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Tags cl_Post_set">
                <List
                  dataSource={tags}
                  renderItem={(item) => (
                    <span>
                      <Tag
                        color={selected_tags.includes(item) ? 'blue' : ''}
                        onClick={this.selectTag}
                      >
                        {item}
                      </Tag>
                    </span>
                  )}
                />
              </div>
              <Button
                type="primary"
                className="cl_Post_Comments_Add_Btn"
                onClick={this.handleSubmit}
              >
                Post!
              </Button>
              <div className="cl_post_Margin"></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlePost: (id) => dispatch(currentPost(id)),
});

export default connect(null, mapDispatchToProps)(DevTemplate);
