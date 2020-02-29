import React, { Component } from 'react';
// * File
import MainBlog from '../../components/mainblog/MainBlog';
import TabBlog from '../TabBlog';

export default class MainBlogPage extends Component {
  render() {
    return (
      <div>
        <TabBlog></TabBlog>
        <MainBlog></MainBlog>
      </div>
    );
  }
}
