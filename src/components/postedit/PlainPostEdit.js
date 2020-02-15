// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
// * File
import CodeBlock from './CodeBlock';
import TabBlog from '../../pages/TabBlog';
import { currentPage } from '../../redux/action';
import { PostEditPost, getSelectPost } from '../../redux/api';
// * CSS
import { Tag, Input, Button, Avatar, AutoComplete } from 'antd';

const dataSource = ['React', 'Redux', 'TypeScript'];
function onSelect(value) {
  console.log('onSelect', value);
}

class PlainPostEdit extends Component {
  state = {
    value: '',
    post: {},
    title: null,
    content: JSON.parse(localStorage.getItem('currentPost')).content,
    tags: [],
    selected_tag: null,
  };

  componentDidMount() {
    this.props.handlePage('Edit');
    let id = this.props.PostState.currentPost.id;
    if (id) {
      localStorage.setItem('post_id', JSON.stringify({ id: id }));
    } else {
      id = JSON.parse(localStorage.getItem('post_id')).id;
    }

    getSelectPost(id).then((res) => {
      this.setState({ post: Object.assign(this.state.post, res.data) });
    });
  }

  handleInputData = (state) => (e) => {
    this.setState({ [state]: e.target.value });
  };

  handlePublishBtn = async () => {
    localStorage.removeItem('currentPost');
    const { title, content } = this.state;
    let localData_id = JSON.parse(localStorage.getItem('post_id')).id;
    await PostEditPost(localData_id, title, content);
    localStorage.removeItem('post_id');
  };
  render() {
    const { value, post, content } = this.state;
    let PropTitle, userName;
    if (!Object.keys(post).length) {
      return <></>;
    } else {
      PropTitle = post.title;
      userName = post.users.username;
    }

    return (
      <div>
        <TabBlog></TabBlog>

        <div className="cl_Post">
          <Input
            className="cl_Edit_Title cl_Post_set "
            type="text"
            onChange={this.handleInputData('title')}
            defaultValue={PropTitle}
          />
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">{userName}</div>
          </div>
          <div className="cl_Plain_Edit_Content ">
            <TextareaAutosize
              className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
              onChange={this.handleInputData('content')}
              defaultValue={content}
            />
            <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
              <ReactMarkdown
                source={content}
                renderers={{
                  code: CodeBlock,
                }}
              />
            </div>
          </div>

          <div className="cl_Post_Tags cl_Post_set">
            <Tag color="red" closable>
              React
            </Tag>
            <Tag color="volcano" closable>
              Redux
            </Tag>
          </div>
          <AutoComplete
            value={value}
            onSelect={onSelect}
            onChange={this.onChange}
            style={{ width: 200 }}
            dataSource={dataSource}
            placeholder="Find a tag"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
          <Button
            type="primary"
            className="cl_Edit_Publish_Btn"
            onClick={this.handlePublishBtn}
          >
            <Link to="/blog">Publish</Link>
          </Button>
          <div className="cl_post_Margin"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    PostState: state.PostState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handlePage: (page) => {
      dispatch(currentPage(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlainPostEdit);
