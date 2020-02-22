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
import { PostEditPost, getSelectPost, getTags } from '../../redux/api';
// * CSS
import { Tag, Input, Button, Avatar, List, message } from 'antd';

class TILPostEdit extends Component {
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

    getTags()
      .then(({ data: { tags } }) => {
        this.setState({ tags });
      })
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));
  }

  // ? 포스트 자동저장 메소드
  handleInputData = (state) => (e) => {
    if (state === 'title') {
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          title: e.target.value,
        },
      });
    } else if (state === 'selected_tags') {
      this.selectTag(e);
    } else {
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          content: {
            ...this.state.post.content,
            [state]: e.target.value,
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
    let content = {
      til_fact: post.content.til_fact,
      til_feeling: post.content.til_feeling,
      til_finding: post.content.til_finding,
      til_future_action: post.content.til_future_action,
    };

    // 로컬 스토리지에 저장 데이터 저장
    if (PostSave) {
      let saveData = JSON.stringify(
        Object.assign(PostSave, {
          [id]: {
            title: post.title,
            content,
            selected_tags: post.selected_tags,
          },
        }),
      );
      localStorage.setItem('PostSave', saveData);
    } else {
      localStorage.setItem(
        'PostSave',
        JSON.stringify({
          [id]: {
            title: post.title,
            content,
            selected_tags: post.selected_tags,
          },
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
    let content = {
      til_fact: post.content.til_fact,
      til_feeling: post.content.til_feeling,
      til_finding: post.content.til_finding,
      til_future_action: post.content.til_future_action,
    };
    if (!post.title.length) {
      message.error('Please input a title!');
    } else {
      await PostEditPost(localData_id, post.title, content, post.selected_tags);
      // 로컬 스토리지 아이템 제거
      localStorage.removeItem('currentPost');
      delete deleteSave[localData_id];
      localStorage.setItem('PostSave', JSON.stringify(deleteSave));
      // 페이지 이동
      this.props.history.push('/tilpost');
    }
  };

  // ? 태그 메소드
  selectTag = (e) => {
    const { selected_tags } = this.state.post;
    const target = e.target.innerText;

    if (!selected_tags.includes(target)) {
      e.target.className = 'ant-tag-blue';
      this.setState({
        post: {
          ...this.state.post,
          selected_tags: [...selected_tags, target],
        },
      });
    } else {
      e.target.className = '';
      this.setState({
        post: {
          ...this.state.post,
          selected_tags: selected_tags.filter((tag) => tag !== target),
        },
      });
    }
  };

  // ! Render
  render() {
    const { post, tags } = this.state;

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
          <div className="cl_Post_Contents ">
            <div className="cl_Post_Edit_Subtitle ">Fact</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('til_fact')}
                defaultValue={post.content.til_fact}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={post.content.til_fact}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Feeling</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('til_feeling')}
                defaultValue={post.content.til_feeling}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={post.content.til_feeling}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle "> Finding</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('til_finding')}
                defaultValue={post.content.til_finding}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={post.content.til_finding}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Edit_Subtitle "> Future Action</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputData('til_future_action')}
                defaultValue={post.content.til_future_action}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={post.content.til_future_action}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <List
              dataSource={tags}
              renderItem={(item) => (
                <span>
                  <Tag
                    color={post.selected_tags.includes(item) ? 'blue' : ''}
                    onClick={this.handleInputData('selected_tags')}
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
export default connect(mapStateToProps, mapDispatchToProps)(TILPostEdit);
