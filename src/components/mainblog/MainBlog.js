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
// * CSS
import { Layout } from 'antd';
const { Footer } = Layout;

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
    console.log(this.state.post);
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
            <Link to="/PlainPost" className="cl_MainBlog_Frame">
              <PlainPostList post={post.plain_posts}></PlainPostList>
            </Link>
            <Link to="/TILPost" className="cl_MainBlog_Frame">
              <TILPostList post={post.til_posts}></TILPostList>
            </Link>
            <Link to="/TechPost" className="cl_MainBlog_Frame">
              <TechPostList post={post.tech_posts}></TechPostList>
            </Link>

            <Link to="/DevPost" className="cl_MainBlog_Frame">
              <DevPostList post={post.dev_posts}></DevPostList>
            </Link>
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
