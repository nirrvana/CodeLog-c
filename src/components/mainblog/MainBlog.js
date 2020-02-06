import React, { Component } from 'react';
import PlanePostList from './planepost/PlanePostList';
import TILPostList from './tilpost/TILPostList';
import TechPostList from './techpost/TechPostList';
import DevPostList from './devpost/DevPostList';
import fakedata from '../../fakedata';

export default class MainBlog extends Component {
  render() {
    return (
      <div className="cl_MainBlog">
        <div className="cl_MainBlog_theme">
          <spna>Plane Post</spna>
          <spna>TIL Post</spna>
          <spna>TECH Post</spna>
          <spna>DEV Post</spna>
        </div>
        <div className="cl_MainBlog_posts">
          <PlanePostList fakedata={fakedata}> </PlanePostList>
          <TILPostList fakedata={fakedata}> </TILPostList>
          <TechPostList fakedata={fakedata}> </TechPostList>
          <DevPostList fakedata={fakedata}> </DevPostList>
        </div>
      </div>
    );
  }
}
