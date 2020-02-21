// * Library
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import debounce from 'lodash.debounce';
// * File
import CodeBlock from './CodeBlock';
import TabBlog from '../../pages/TabBlog';
import { currentPage } from '../../redux/action';
import { getRandomInt, colorArray } from '../../TagColor';
import { PostEditPost, getSelectPost, getTags } from '../../redux/api';
// * CSS
import { Tag, Input, Button, Avatar, AutoComplete, List, message } from 'antd';

class PlainPostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      tagValue: '',
      tagSource: [],
    };
    this.handleEditDataSave = debounce(this.handleEditDataSave, 1000);
  }
  componentDidMount() {
    // 현재 페이지 값 업데이트
    this.props.handlePage('Edit');
    let id = this.props.PostState.currentPost.id;
    let SaveData = JSON.parse(localStorage.getItem('PostSave'));
    if (id) {
      localStorage.setItem('post_id', JSON.stringify({ id: id }));
    } else {
      id = JSON.parse(localStorage.getItem('post_id')).id;
    }

    // 서버 요청
    getSelectPost(id).then((res) => {
      console.log('SaveData:', SaveData);
      if (SaveData) {
        let save = SaveData[id];
        if (save) {
          console.log('현재 포스트와 일치하는 저장 데이터가 있을때 !');
          this.setState({
            post: Object.assign(res.data, save),
          });
        } else {
          console.log('현재 포스트와 일치하는 저장 데이터가 없을때 !');
          this.setState({
            post: Object.assign(this.state.post, res.data),
          });
        }
      } else {
        console.log('현재 포스트 로컬스토리지에 세이브가 없을때 !');
        this.setState({
          post: Object.assign(this.state.post, res.data),
        });
      }
    });
    getTags().then((res) => this.setState({ tagSource: res.data.tags }));
  }

  // ? 태그 메소드
  onSelect = (tagValue) => {
    if (this.state.post.plain_selected_tags.includes(tagValue)) {
      message.warning(`${tagValue} is already added`);
    } else {
      this.setState({
        post: {
          ...this.state.post,
          plain_selected_tags: this.state.post.plain_selected_tags.concat([
            tagValue,
          ]),
        },
      });
    }
  };

  onChange = (tagValue) => {
    this.setState({ tagValue });
  };

  onClose = (item) => {
    this.setState({
      post: {
        ...this.state.post,
        plain_selected_tags: this.state.post.plain_selected_tags.filter(
          (tag) => tag !== item,
        ),
      },
    });
  };

  // ? 포스트 자동저장 메소드
  handleInputData = (state) => (event) => {
    if (state === 'title') {
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          title: event.target.value,
        },
      });
    } else {
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          content: {
            [state]: event.target.value,
          },
        },
      });
    }

    this.handleEditDataSave();
  };
  handleEditDataSave = () => {
    const { post } = this.state;

    let id = JSON.parse(localStorage.getItem('post_id')).id;
    let PostSave = JSON.parse(localStorage.getItem('PostSave'));

    // 로컬 스토리지에 저장 데이터 저장
    if (PostSave) {
      let saveData = JSON.stringify(
        Object.assign(PostSave, {
          [id]: { title: post.title, content: post.content },
        }),
      );
      localStorage.setItem('PostSave', saveData);
    } else {
      localStorage.setItem(
        'PostSave',
        JSON.stringify({
          [id]: { title: post.title, content: post.content },
        }),
      );
    }
  };

  // ? 포스트 수정 메소드
  handlePublishBtn = async () => {
    const { post } = this.state;

    // 서버 요청
    let localData_id = JSON.parse(localStorage.getItem('post_id')).id;
    let deleteSave = JSON.parse(localStorage.getItem('PostSave'));
    console.log(
      'REQUEST_DATA:',
      localData_id,
      post.title,
      post.content,
      post.plain_selected_tags,
    );

    await PostEditPost(
      localData_id,
      post.title,
      post.content,
      post.plain_selected_tags,
    );
    // 로컬 스토리지 아이템 제거
    localStorage.removeItem('currentPost');
    delete deleteSave[localData_id];
    localStorage.setItem('PostSave', JSON.stringify(deleteSave));
    // 페이지 이동
    this.props.history.push('/plainpost');
  };

  // ! Render
  render() {
    const { tagValue, post, tagSource } = this.state;
    let tagView;
    console.log('POST_STATE:', post);
    if (
      post.plain_selected_tags === undefined ||
      !post.plain_selected_tags.length
    ) {
      tagView = 'none';
    }

    if (!Object.keys(post).length) {
      return <></>;
    }

    return (
      <div>
        <TabBlog></TabBlog>

        <div className="cl_Post">
          <Input
            className="cl_Edit_Title cl_Post_set "
            type="text"
            onChange={this.handleInputData('title')}
            defaultValue={post.title}
          />
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">{post.user.username}</div>
          </div>
          <div className="cl_Plain_Edit_Content ">
            <TextareaAutosize
              className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
              onChange={this.handleInputData('plain_content')}
              defaultValue={post.content.plain_content}
            />
            <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
              <ReactMarkdown
                source={post.content.plain_content}
                renderers={{
                  code: CodeBlock,
                }}
              />
            </div>
          </div>

          <AutoComplete
            className="cl_Post_Tags cl_Post_set"
            value={tagValue}
            onSelect={this.onSelect}
            onChange={this.onChange}
            style={{ width: 200 }}
            dataSource={tagSource}
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
              dataSource={post.plain_selected_tags}
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
            Publish
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
