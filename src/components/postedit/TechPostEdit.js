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

class TechPostEdit extends Component {
  state = {
    value: '',
    post: {},
    title: JSON.parse(localStorage.getItem('currentPost')).title,
    concept: JSON.parse(localStorage.getItem('currentPost')).content,
    background: JSON.parse(localStorage.getItem('currentPost')).content,
    definition: JSON.parse(localStorage.getItem('currentPost')).content,
    example: JSON.parse(localStorage.getItem('currentPost')).content,
    precausions: JSON.parse(localStorage.getItem('currentPost')).content,
    recommand: JSON.parse(localStorage.getItem('currentPost')).content,
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

    const {
      title,
      concept,
      background,
      definition,
      example,
      precausions,
      recommand,
    } = this.state;
    let localData_id = JSON.parse(localStorage.getItem('post_id')).id;
    let content =
      concept + background + definition + example + precausions + recommand;
    await PostEditPost(localData_id, title, content);
    localStorage.removeItem('post_id');
  };
  render() {
    const {
      value,
      concept,
      background,
      definition,
      example,
      precausions,
      recommand,
      post,
    } = this.state;
    console.log(post);
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
          <div className="cl_Post_Contents ">
            <div className="cl_Post_Edit_Subtitle ">Tech concept</div>
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

            <div className="cl_Post_Edit_Subtitle "> Tech background</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('background')}
                defaultValue={background}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={background}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle "> Tech definition</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('definition')}
                defaultValue={definition}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={definition}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Tech example</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('example')}
                defaultValue={example}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={example}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Tech precausions</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('precausions')}
                defaultValue={precausions}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={precausions}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle ">Tech recommand concept</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('recommand')}
                defaultValue={recommand}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={recommand}
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
export default connect(mapStateToProps, mapDispatchToProps)(TechPostEdit);
