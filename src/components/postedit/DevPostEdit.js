// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PostEditPost, getSelectPost } from '../../redux/api';
import { currentPage } from '../../redux/action';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
// * File
import TabBlog from '../../pages/TabBlog';
import CodeBlock from './CodeBlock';

// * CSS
import { Tag, Input, Button, Avatar, AutoComplete } from 'antd';

const dataSource = ['React', 'Redux', 'TypeScript'];
function onSelect(value) {
  console.log('onSelect', value);
}

class DevPostEdit extends Component {
  state = {
    value: '',
    post: {},
    title: JSON.parse(localStorage.getItem('currentPost')).title,
    concept: JSON.parse(localStorage.getItem('currentPost')).content,
    Strategy: JSON.parse(localStorage.getItem('currentPost')).content,
    handling: JSON.parse(localStorage.getItem('currentPost')).content,
    Referenece: JSON.parse(localStorage.getItem('currentPost')).content,
    Lesson: JSON.parse(localStorage.getItem('currentPost')).content,
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

  onChange = (value) => {
    this.setState({ value });
  };
  handleInputData = (state) => (e) => {
    this.setState({ [state]: e.target.value });
  };
  handlePublishBtn = async () => {
    localStorage.removeItem('currentPost');
    const {
      title,
      concept,
      Strategy,
      handling,
      Referenece,
      Lesson,
    } = this.state;
    let localData_id = JSON.parse(localStorage.getItem('post_id')).id;
    let content = concept + Strategy + handling + Referenece + Lesson;
    await PostEditPost(localData_id, title, content);
    localStorage.removeItem('post_id');
  };
  render() {
    const {
      value,
      concept,
      Strategy,
      handling,
      Referenece,
      Lesson,
      post,
    } = this.state;
    console.log(post);
    let PropTitle, userName;
    if (!Object.keys(post).length) {
      return <dev></dev>;
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
          <div className="cl_Post_Contents ">
            <div className="cl_Post_Edit_Subtitle ">Project concept</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('concept')}
                defaultValue={concept}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={concept}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Coding Strategy</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('Strategy')}
                defaultValue={Strategy}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={Strategy}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle "> Error handling</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('handling')}
                defaultValue={handling}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={handling}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Referenece</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('Referenece')}
                defaultValue={Referenece}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={Referenece}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle "> Lesson</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('Lesson')}
                defaultValue={Lesson}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={Lesson}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
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
            <Link to="/Blog">Publish</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(DevPostEdit);
