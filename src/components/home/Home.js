/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
// * Components
import { getHomeData } from '../../redux/api';
import Tab from '../../pages/Tab';
import Newcompany from './newcompany/NewCompanyList';
import RecentPostList from './recentpost/RecentPostList';
import RecommandedPostList from './recommandedpost/RecommandedPostList';

export default class Home extends Component {
  state = {
    contents: {},
  };
  componentDidMount() {
    getHomeData().then((res) => {
      console.log('응답 : ', res);
      this.setState({ contents: Object.assign(this.state.contents, res.data) });
    });
  }
  render() {
    const { contents } = this.state;

    if (!Object.keys(contents).length) {
      return <div></div>;
    } else {
      return (
        <div>
          <Tab></Tab>
          <div className="cl_AD_Image_Frame">
            <img className="cl_AD_Image" src="https://ifh.cc/g/NYA0w.jpg" />
          </div>
          <div className="cl_Home_Contents_Frame">
            <div className="cl_Home_Themes">
              <span className="cl_Home_Theme1">New Post</span>
              <span className="cl_Home_Theme2">Recommend Post</span>
              <span className="cl_Home_Theme3">New Company</span>
            </div>
            <div className="cl_Home_Contents">
              <RecentPostList data={contents.new_post}></RecentPostList>
              <RecommandedPostList
                data={contents.recommended_post}
              ></RecommandedPostList>
              <Newcompany data={contents.new_company}></Newcompany>
            </div>
          </div>
        </div>
      );
    }
  }
}
