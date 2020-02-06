import React, { Component } from 'react';
// * Components
import Tab from '../../pages/Tab';
import Newcompany from './newcompany/NewCompanyList';
import RecentPostList from './recentpost/RecentPostList';
import RecommandedPostList from './recommandedpost/RecommandedPostList';
// * data
import fakedata from '../../fakedata';

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* 항상 보이는 상단 bar = Tab */}
        <Tab></Tab>
        <div className="cl_AD_Image_Frame">
          <img className="cl_AD_Image" src="https://ifh.cc/g/NYA0w.jpg" />
        </div>
        <div className="cl_Home_Contents_Frame">
          <div className="cl_Home_Themes">
            <spna className="cl_Home_Theme1">New Post</spna>
            <spna className="cl_Home_Theme2">Recommend Post</spna>
            <spna className="cl_Home_Theme3">New Company</spna>
          </div>
          <div className="cl_Home_Contents">
            <RecentPostList fakedata={fakedata}></RecentPostList>
            <RecommandedPostList fakedata={fakedata}></RecommandedPostList>
            <Newcompany fakedata={fakedata}></Newcompany>
          </div>
        </div>
      </div>
    );
  }
}
