// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentPage } from '../../redux/action';
// * File
import { getBlogPost } from '../../redux/api';
import PlainPostList from './plainpost/PlainPostList';
import TILPostList from './tilpost/TILPostList';
import TechPostList from './techpost/TechPostList';
import DevPostList from './devpost/DevPostList';

class MainBlog extends Component {
  state = {
    post: {},
  };
  componentDidMount() {
    getBlogPost().then((res) => {
      this.setState({ post: Object.assign(this.state.post, res.data) });
    });
    this.props.handlePage('Blog');
  }
  render() {
    const { post } = this.state;
    if (!Object.keys(this.state.post).length) {
      return (
        <div className="cl_MainBlog">
          <div className="cl_MainBlog_theme">
            <span>Plain Post</span>
            <span>TIL Post</span>
            <span>TECH Post</span>
            <span>DEV Post</span>
          </div>
          <div className="cl_MainBlog_posts"></div>
        </div>
      );
    } else {
      return (
        <div className="cl_MainBlog">
          <div className="cl_MainBlog_theme">
            <span>Plain Post</span>
            <span>TIL Post</span>
            <span>TECH Post</span>
            <span>DEV Post</span>
          </div>
          <div className="cl_MainBlog_posts">
            <div className="cl_MainBlog_Frame">
              <PlainPostList post={post.plain_posts}></PlainPostList>
            </div>
            <div className="cl_MainBlog_Frame">
              <TILPostList post={post.til_posts}></TILPostList>
            </div>
            <div className="cl_MainBlog_Frame">
              <TechPostList post={post.tech_posts}></TechPostList>
            </div>
            <div className="cl_MainBlog_Frame">
              <DevPostList post={post.dev_posts}></DevPostList>
            </div>
          </div>
        </div>
      );
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(MainBlog);
