import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPost, currentPage } from '../../redux/action';
import TabBlog from '../../pages/TabBlog';
import { Link } from 'react-router-dom';

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
const example = [
  `What is Dev post ?`,
  ` We supply a series of design principles, practical patterns and
high quality design resources (Sketch and Axure), to help people
create their product prototypes beautifully and efficiently.
div> We supply a series of design principles, practical patterns
and high quality design resources (Sketch and Axure), to help
people create their product prototypes beautifully and
efficiently. div> We supply a series of design principles,
practical patterns and high quality design resources (Sketch and
Axure), to help people create their product prototypes
beautifully and efficiently.`,
];
var count = 0;

class TILPost extends Component {
  state = {
    value: '',
    isLike: false,
  };
  componentDidMount() {
    this.props.handlePage('Post');
  }
  handlePostData() {
    localStorage.setItem(
      'currentPost',
      JSON.stringify({ title: example[0], contents: example[1] }),
    );
  }

  handleIsLikeState() {
    if (this.state.isLike) {
      count--;
    } else {
      count++;
    }
    this.setState({
      isLike: !this.state.isLike,
    });
  }
  render() {
    console.log(this.state.isLike);
    const { isLike } = this.state;
    let color;
    if (isLike) {
      color = 'red';
    }

    return (
      <div>
        <TabBlog></TabBlog>
        <div className="cl_Post">
          <div className="cl_Post_Title cl_Post_set ">What is TIL post ?</div>
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">Root</div>

            <Tooltip
              className="cl_Post_Time"
              title={moment().format('YYYY-MM-DD HH:mm:ss')}
            >
              <div>{moment().fromNow()}</div>
            </Tooltip>

            <Link
              to="/TILpostEdit"
              className="cl_Post_Edit_Btn"
              onClick={() => this.handlePostData()}
            >
              Edit
            </Link>
          </div>
          <div className="cl_Post_Contents cl_PlanePost_Contents ">
            <div className="cl_Post_Content">
              Fact
              <div className="cl_Post_Contents">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_Post_Content">
              Feeling
              <div className="cl_Post_Contents">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_Post_Content">
              Finding
              <div className="cl_Post_Contents">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_Post_Content">
              Future Action
              <div className="cl_Post_Contents">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
          </div>
          <div className="cl_Post_Tag cl_Post_set">
            <Tag color="red">React</Tag>
            <Tag color="volcano">Redux</Tag>
            <Popover content={count + ' Likes'}>
              <Icon
                type="heart"
                className="cl_PlanePost_Like"
                onClick={() => this.handleIsLikeState()}
                style={(color = { color })}
              />
            </Popover>
          </div>
          <List
            className="cl_PlanePost_Comments "
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
export default connect(mapStateToProps, mapDispatchToProps)(TILPost);
