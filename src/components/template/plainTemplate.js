import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//* redux
import { connect } from 'react-redux';
import { getTags, postPlainPost } from '../../redux/api';
import { currentPost } from '../../redux/action';
//* library
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import CodeBlock from '../postedit/CodeBlock';
import debounce from 'lodash.debounce';
//* css
import { Tag, Input, Button, Avatar, List, message, Modal } from 'antd';
class PlainTemplate extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'plain',
      title: '',
      plain_content: '',
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
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));

    this.checkData();
  }

  checkData = () => {
    const saved = JSON.parse(localStorage.getItem('plain'));

    if (saved) {
      const { title, plain_content, selected_tags } = saved;
      if (!this.isEmpty(title, plain_content, selected_tags)) {
        this.setState({ visible: true });
      }
    }
  };

  isEmpty = (...data) => {
    let empty_count = 0;

    for (const datum of data) {
      if (typeof datum === 'string') {
        if (!/\S/.test(datum)) {
          empty_count++;
        }
      } else {
        if (datum.length === 0) {
          empty_count++;
        }
      }
    }
    return empty_count === data.length;
  };

  getData = (e) => {
    const saved = JSON.parse(localStorage.getItem('plain'));
    const { title, plain_content, selected_tags } = saved;
    this.setState({
      visible: false,
      title,
      plain_content,
      selected_tags,
    });
  };

  dropData = (e) => {
    this.setState({
      visible: false,
    });
    localStorage.removeItem('plain');
  };

  handleInputChange = (state) => ({ target: { value: input } }) => {
    this.setState({
      [state]: input,
    });
    this.handleDebounceInputChange();
  };

  handleDebounceInputChange = () => {
    const { theme, title, plain_content, selected_tags } = this.state;
    localStorage.setItem(
      theme,
      JSON.stringify({ title, plain_content, selected_tags }),
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
    const { theme, title, plain_content, selected_tags } = this.state;

    if (/\S/.test(title)) {
      postPlainPost(theme, title, { plain_content }, selected_tags)
        .then(({ data: { post_id } }) => {
          this.props.handlePost(post_id);
          message.success('Post successfully!');
          this.setState({ isPosted: true });
          localStorage.removeItem('plain');
        })
        .catch((err) => message.error('Fail to post..'));
    } else {
      message.error('Please input title value');
    }
  };

  render() {
    const {
      title,
      plain_content,
      selected_tags,
      tags,
      visible,
      isPosted,
    } = this.state;
    if (isPosted) {
      return <Redirect to="PlainPost" />;
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
              <div className="cl_Post_Edit_Subtitle ">Content</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('plain_content')}
                  defaultValue={plain_content}
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={plain_content}
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

export default connect(null, mapDispatchToProps)(PlainTemplate);
