/* eslint-disable jsx-a11y/alt-text */
// * Library
import React, { Component } from 'react';

// * File
import Tab from '../../pages/Tab';
import { getHomeData } from '../../redux/api';
import Newcompany from './newcompany/NewCompanyList';
import RecentPostList from './recentpost/RecentPostList';
import RecommandedPostList from './recommandedpost/RecommandedPostList';

export default class Home extends Component {
  state = {
    content: {},
  };
  componentDidMount() {
    getHomeData().then((res) => {
      this.setState({ content: Object.assign(this.state.content, res.data) });
    });
  }
  render() {
    const { content } = this.state;
    console.log(this.props);

    if (!Object.keys(content).length) {
      return <></>;
    } else {
      return (
        <div>
          <Tab></Tab>
          <div className="cl_AD_Image_Frame">
            <img className="cl_AD_Image" src="https://ifh.cc/g/NYA0w.jpg" />
          </div>
          <div className="cl_Home_content_Frame">
            <div className="cl_Home_Themes">
              <span className="cl_Home_Theme1">New Post</span>
              <span className="cl_Home_Theme2">Recommend Post</span>
              <span className="cl_Home_Theme3">New Company</span>
            </div>
            <div className="cl_Home_Contents">
              <RecentPostList data={content.new_post}></RecentPostList>
              <RecommandedPostList
                data={content.recommended_post}
              ></RecommandedPostList>
              {/* <Newcompany data={content.new_company}></Newcompany> */}
            </div>
          </div>
        </div>
      );
    }
  }
}
