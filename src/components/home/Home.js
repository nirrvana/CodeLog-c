import React, { Component } from 'react';
// * Components
import Tab from '../../pages/Tab';
import NewPostList from './newpost/NewPostList';
import RecentPostList from './recentpost/RecentPostList';
import RecommandedPostList from './recommandedpost/RecommandedPostList';
// * data
import fakedata from './fakedata';

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* 항상 보이는 상단 bar = Tab */}
        <Tab></Tab>
        <div className="cl_Home_Contents">
          <NewPostList fakedata={fakedata}></NewPostList>
          <RecentPostList fakedata={fakedata}></RecentPostList>
          <RecommandedPostList fakedata={fakedata}></RecommandedPostList>
        </div>
      </div>
    );
  }
}
