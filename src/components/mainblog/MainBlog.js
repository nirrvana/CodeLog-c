import React, { Component } from 'react';
import PlanePostList from './planepost/PlanePostList';
import TILPostList from './tilpost/TILPostList';
import TechPostList from './techpost/TechPostList';
import DevPostList from './devpost/DevPostList';
import fakedata from '../../fakedata';
import { connect } from 'react-redux';
import { currentPost } from '../../redux/action';
import { Link } from 'react-router-dom';

class MainBlog extends Component {
  render() {
    // console.log(this.props);
    const { handleTheme } = this.props;
    return (
      <div className="cl_MainBlog">
        <div className="cl_MainBlog_theme">
          <span>Plane Post</span>
          <span>TIL Post</span>
          <span>TECH Post</span>
          <span>DEV Post</span>
        </div>
        <div className="cl_MainBlog_posts">
          <Link to="PlanePost" onClick={() => handleTheme('PlanePost')}>
            <PlanePostList fakedata={fakedata}></PlanePostList>
          </Link>

          <div onClick={() => handleTheme('TILPost')}>
            <TILPostList fakedata={fakedata}></TILPostList>
          </div>
          <div onClick={() => handleTheme('TechPost')}>
            <TechPostList fakedata={fakedata}></TechPostList>
          </div>
          <Link
            to="DevPost"
            onClick={() => {
              handleTheme('DevPost');
            }}
          >
            <DevPostList fakedata={fakedata}></DevPostList>
          </Link>
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
    handleTheme: (theme) => {
      dispatch(currentPost(theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainBlog);
