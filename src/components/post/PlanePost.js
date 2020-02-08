/* eslint-disable jsx-a11y/accessible-emoji */
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
class PlanePost extends Component {
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
          <div className="cl_Post_Title cl_Post_set ">About warr mantion</div>
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
              to="/PlanepostEdit"
              className="cl_Post_Edit_Btn"
              onClick={() => this.handlePostData()}
            >
              Edit
            </Link>
          </div>
          <div></div>
          <div className="cl_Post_Contents cl_Post_set">
            contents Let’s start with Quick Introduction to React Hooks Hooks
            are functions that let you “hook into” React state and lifecycle
            features from function components. Hooks don’t work in classes —
            they let you use React without classes. useState 😄 useState is a
            Hook, We call it inside a function component when we want to add
            some local state to it. The good thing about this is that the state
            will be preserved during re-rendering. useState returns a pair: the
            current state value and a function that lets you update your
            component. Calling a function will work similarly to this.setState
            where it will update the values of the state, except it will not
            merge old and new state. useEffect 😄 The Effect Hook, useEffect
            adds the ability to perform side effects from a function component.
            The purpose of useEffect is similar to the purpose of Lifecycle
            methods in the class component like componentDidMount ,
            componentDidUpdate and componentWillUnMount You can also decide when
            to re-render. Consider below the example where we have passed a
            count array after the useEffect. // Only re-run the effect if count
            changes Let’s consider if the count value is 60 and if the component
            re-renders with the count value being unchanged i.e. 60, React will
            compare the previous render value and decide whether to call effect
            or not. If values are different then only the effect is called. Now
            that’s a way to increase performance and avoid unnecessary calls. 💯
            🚀 If there are multiple items in the array, React will re-run the
            effect even if just one of them is different. Converting Class
            Component into a Functional Component with Hooks ⚖️ Let’s look at
            the example of how we can get the same behavior as a class component
            in a function component using Hooks. Example: Consider an example
            where you need to make API calls and fetch the data and populate in
            our component and clicking on the load more button would fetch more
            data from the server. Until the Release of React 16.8.0(Hooks), it
            wasn't possible to achieve these using functional components as
            lifecycle methods aren’t accessible in the functional component and
            it wasn’t possible to manage the state inside a functional
            component. For making API calls we will use Github APIs
            https://developer.github.com/v3/search/#search-commits Here is what
            a typical React code looks like for both ordinary class component
            and functional component using Hooks. API call code [ Icon Credit —
            Roundicons ] Whenever API calls are involved we need multiple state
            values — Holding that data that is to be rendered Page count to make
            API call Loading state (show loading screen/component until the data
            is received from server) Error state (show error message when
            something goes wrong while fetching data) Thus above image with
            Class component and the functional component does the same thing of
            loading the commits from the Github. Thus this simple example will
            help you understand how easy it is to start using hook into your
            application. With hooks, you can use write code neatly and sort. API
            Calls with React Hooks Code Snippet — Class Component API calling
            Code — Hooks API calling Code Links to Live Demo Class Component API
            calls - CodeSandbox CodeSandbox is an online editor tailored for web
            applications. codesandbox.io
            https://codesandbox.io/s/functional-component-api-calls-qgho3 Here
            are the rules you should keep in mind while working with React Hooks
            Don’t try to convert the old code written in class components into
            Hooks. However, it is recommended you can try using Hooks in the new
            implementation useState and useEffect are the two new concepts which
            you should know to master Hooks Only call Hooks at the top level.
            Don’t call Hooks inside loops, conditions, or nested functions. Only
            call Hooks from React function components. Don’t call Hooks from
            regular JavaScript functions. Thus this is how React Hooks can be
            useful in making API calls, sometimes we have to convert a
            functional component into a class component only because of not
            being able to manage the state inside the functional component.
            Reference
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
export default connect(mapStateToProps, mapDispatchToProps)(PlanePost);
