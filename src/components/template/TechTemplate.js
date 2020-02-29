import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//* redux
import { connect } from 'react-redux';
import { getTags, postTechPost } from '../../redux/api';
import { currentPost } from '../../redux/action';
//* parser
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import CodeBlock from '../../components/postedit/CodeBlock';
import debounce from 'lodash.debounce';
//* css
import { Tag, Input, Button, Avatar, List, message, Modal } from 'antd';

class TechTemplate extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'tech',
      title: '',
      tech_concept: '',
      tech_background: '',
      tech_definition: '',
      tech_example: '',
      tech_precaution: '',
      tech_recommended_concept: '',
      selected_tags: [],
      tags: [],
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
      .catch((err) => {
        throw err;
      });

    this.checkData();
  }

  checkData = () => {
    const saved = JSON.parse(localStorage.getItem('tech'));
    if (saved) {
      this.setState({ visible: true });
    }
  };

  getData = (e) => {
    const saved = JSON.parse(localStorage.getItem('tech'));
    const {
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    } = saved;
    this.setState({
      visible: false,
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    });
  };

  dropData = (e) => {
    this.setState({
      visible: false,
    });
    localStorage.removeItem('tech');
  };

  handleInputChange = (state) => ({ target: { value: input } }) => {
    this.setState({
      [state]: input,
    });
    this.handleDebounceInputChange();
  };

  handleDebounceInputChange = () => {
    const {
      theme,
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    } = this.state;
    localStorage.setItem(
      theme,
      JSON.stringify({
        title,
        tech_concept,
        tech_background,
        tech_definition,
        tech_example,
        tech_precaution,
        tech_recommended_concept,
        selected_tags,
      }),
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
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    } = this.state;

    const content = {
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
    };

    if (/\S/.test(title)) {
      postTechPost(theme, title, content, selected_tags)
        .then(({ data: { post_id } }) => {
          this.props.handlePost(post_id);
          message.success('Post successfully!');
          this.setState({ isPosted: true });
          localStorage.removeItem('tech');
        })
        .catch((err) => message.error('Fail to post..'));
    } else {
      message.error('Please input title value');
    }
  };

  render() {
    const {
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
      tags,
      visible,
      isPosted,
    } = this.state;
    if (isPosted) {
      return <Redirect to="TechPost" />;
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
              <div className="cl_Post_Edit_Subtitle ">Tech concept</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_concept')}
                  defaultValue={tech_concept}
                  placeholder="블로깅 할 개념"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_concept}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Tech background</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_background')}
                  defaultValue={tech_background}
                  placeholder="해당 개념을 블로깅 하게 된 배경"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_background}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Tech definition</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_definition')}
                  defaultValue={tech_definition}
                  placeholder="해당 개념에 대한 정의"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_definition}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Tech example</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_example')}
                  defaultValue={tech_example}
                  placeholder="해당 개념을 설명하기 위한 예시 코드"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_example}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Tech precaution</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_precaution')}
                  defaultValue={tech_precaution}
                  placeholder="해당 개념 사용 시 주의사항"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_precaution}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">
                Tech recommended concept
              </div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('tech_recommended_concept')}
                  defaultValue={tech_recommended_concept}
                  placeholder="해당 개념과 함께보면 좋은 개념"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={tech_recommended_concept}
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

export default connect(null, mapDispatchToProps)(TechTemplate);
