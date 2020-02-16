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
import { getRandomInt, colorArray } from '../../TagColor';
import { PostEditPost, getSelectPost, getTags } from '../../redux/api';

// * CSS
import { Tag, Input, Button, Avatar, AutoComplete, List, message } from 'antd';

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
    selected_tag: JSON.parse(localStorage.getItem('currentPost')).tags,
    dataSource: [],
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
      this.setState({
        post: Object.assign(this.state.post, res.data),
      });
    });
    getTags().then((res) => this.setState({ dataSource: res.data.tags }));
  }
  // ? tag controll
  onSelect = (value) => {
    if (this.state.selected_tag.includes(value)) {
      message.warning(`${value} is already added`);
    } else {
      this.setState({
        selected_tag: this.state.selected_tag.concat([value]),
      });
    }
  };

  onChange = (value) => {
    this.setState({ value });
  };

  onClose = (item) => {
    this.setState({
      selected_tag: this.state.selected_tag.filter((tag) => tag !== item),
    });
  };
  // ? input value change
  handleInputData = (state) => (e) => {
    this.setState({ [state]: e.target.value });
  };
  // ? publish
  handlePublishBtn = async () => {
    localStorage.removeItem('currentPost');
    const {
      title,
      concept,
      Strategy,
      handling,
      Referenece,
      Lesson,
      selected_tag,
    } = this.state;
    let localData_id = JSON.parse(localStorage.getItem('post_id')).id;
    let content = concept + Strategy + handling + Referenece + Lesson;
    console.log('request body:', localData_id, title, content, selected_tag);
    await PostEditPost(localData_id, title, content, selected_tag);
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
      dataSource,
      selected_tag,
    } = this.state;

    let PropTitle, userName, tagView;

    if (selected_tag === undefined || !selected_tag.length) {
      tagView = 'none';
    }

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
          <AutoComplete
            className="cl_Post_Tags cl_Post_set"
            value={value}
            onSelect={this.onSelect}
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
          <div>
            <List
              style={{ display: tagView }}
              dataSource={this.state.selected_tag}
              renderItem={(item) => (
                <span>
                  <Tag
                    closable
                    color={colorArray[getRandomInt(0, 10)]}
                    onClose={() => this.onClose(item)}
                  >
                    {item}
                  </Tag>
                </span>
              )}
            />
          </div>

          <Button
            type="primary"
            className="cl_Edit_Publish_Btn"
            onClick={this.handlePublishBtn}
          >
            <Link to="/Devpost">Publish</Link>
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
