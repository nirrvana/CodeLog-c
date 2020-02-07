import React, { Component } from 'react';
import PlanePostList from './planepost/PlanePostList';
import TILPostList from './tilpost/TILPostList';
import TechPostList from './techpost/TechPostList';
import DevPostList from './devpost/DevPostList';
import fakedata from '../../fakedata';
import { connect } from 'react-redux';
import { ClikedComponent } from '../../redux/action';

class MainBlog extends Component {
  render() {
    console.log(this.props);
    const { handleClickedComponent } = this.props;
    return (
      <div className="cl_MainBlog">
        <div className="cl_MainBlog_theme">
          <span>Plane Post</span>
          <span>TIL Post</span>
          <span>TECH Post</span>
          <span>DEV Post</span>
        </div>
        <div className="cl_MainBlog_posts">
          <div onClick={() => handleClickedComponent('PlanePost')}>
            <PlanePostList fakedata={fakedata}></PlanePostList>
          </div>
          <div onClick={() => handleClickedComponent('TILPost')}>
            <TILPostList fakedata={fakedata}></TILPostList>
          </div>
          <div onClick={() => handleClickedComponent('TechPost')}>
            <TechPostList fakedata={fakedata}></TechPostList>
          </div>
          <div onClick={() => handleClickedComponent('DevPost')}>
            <DevPostList fakedata={fakedata}></DevPostList>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    clickedComponent: state.isEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickedComponent: (string) => dispatch(ClikedComponent(string)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainBlog);
