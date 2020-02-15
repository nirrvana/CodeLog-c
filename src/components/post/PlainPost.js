// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// * File
import TabBlog from '../../pages/TabBlog';
import CodeBlock from '../postedit/CodeBlock';
import { getRandomInt, colorArray } from '../../TagColor';
import { currentPost, currentPage } from '../../redux/action';
import { getSelectPost, PostDeletePost } from '../../redux/api';

// * CSS
import {
  Comment,
  Tooltip,
  Tag,
  List,
  Input,
  Button,
  Icon,
  Popover,
  Avatar,
  Dropdown,
  Menu,
} from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];

class PlainPost extends Component {
  state = {
    post: {},
    isLike: false,
  };
  componentDidMount() {
    this.props.handlePage('Post');
    let id = this.props.PostState.currentPost.id;
    if (id) {
      localStorage.setItem('post_id', JSON.stringify({ id: id }));
    } else {
      id = JSON.parse(localStorage.getItem('post_id')).id;
    }
    getSelectPost(id).then((res) => {
      this.setState({ post: Object.assign({}, this.state.post, res.data) });
    });
  }
  handlePostData = (title, content) => () => {
    let currentPost = {
      title,
      content,
    };
    localStorage.setItem('currentPost', JSON.stringify(currentPost));
  };
  handlDeletePost = async () => {
    await PostDeletePost(this.state.post.id);
  };
  handleIsLikeState = () => {
    let likesCount = this.state.post.likes;

    if (!this.state.isLike) {
      this.setState({
        isLike: true,
        post: { ...this.state.post, likes: likesCount + 1 },
      });
    } else {
      this.setState({
        isLike: false,
        post: { ...this.state.post, likes: likesCount - 1 },
      });
    }
  };
  render() {
    const { isLike, post } = this.state;
    console.log(post);
    let tagView, color, title, content, Likes, userName;

    if (isLike) {
      color = 'red';
    }
    if (post.tags === undefined || !post.tags.length) {
      tagView = 'none';
    }
    if (!Object.keys(post).length) {
      title = '';
      userName = '';
      content = '';
      Likes = 0;
    } else {
      title = post.title;
      userName = post.users.username;
      content = post.content;
      Likes = post.likes;
    }
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <Link
            to="/PlainpostEdit"
            onClick={this.handlePostData(title, content)}
          >
            Edit
          </Link>
        </Menu.Item>

        <Menu.Item key="1">
          <Link to="/Blog" onClick={this.handlDeletePost}>
            Delete
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <TabBlog></TabBlog>
        <div className="cl_Post">
          <div className="cl_Post_Title cl_Post_set ">{title}</div>
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">{userName}</div>

            <Tooltip
              className="cl_Post_Time"
              title={moment().format('YYYY-MM-DD HH:mm:ss')}
            >
              <div>{moment(this.state.post.updatedAt).fromNow()}</div>
            </Tooltip>

            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="setting" className="cl_Post_Edit_Btn" />
            </Dropdown>
          </div>
          <div className="cl_Post_Contents ">
            <ReactMarkdown
              source={content}
              renderers={{
                code: CodeBlock,
              }}
            />
          </div>
          <div className="cl_Post_Tags cl_Post_set">
            <List
              style={{ display: tagView }}
              itemLayout="horizontal"
              dataSource={this.state.post.tags}
              renderItem={(item) => (
                <span>
                  <Tag color={colorArray[getRandomInt(0, 10)]}>{item}</Tag>
                </span>
              )}
            />

            <Popover content={Likes + ' Likes'}>
              <Icon
                type="heart"
                className="cl_PlainPost_Like"
                onClick={this.handleIsLikeState}
                style={(color = { color })}
              />
            </Popover>
          </div>
          <List
            className="cl_PlainPost_Comments "
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
          <div className="cl_Post_Comments_Add cl_Post_set">
            <TextArea
              className="cl_Post_Comments_Add"
              placeholder="Write your feedback !"
              autoSize={{ minRows: 1, maxRows: 6 }}
            />
          </div>
          <Button type="primary" className="cl_Post_Comments_Add_Btn">
            Feedback
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
    handleTheme: (theme, title, contents) => {
      dispatch(currentPost(theme, title, contents));
    },
    handlePage: (page) => {
      dispatch(currentPage(page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlainPost);
