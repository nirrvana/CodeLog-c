/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// * react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// * CSS
import { Layout, Menu, Input, Dropdown } from 'antd';
const { Header } = Layout;
const { Search } = Input;

class TabBlog extends Component {
  render() {
    let display;
    if (
      this.props.currentPage === 'Post' ||
      this.props.currentPage === 'Edit'
    ) {
      display = 'none';
    } else {
      display = '';
    }

    const post_type = (
      <Menu>
        <Menu.Item>
          <Link to="/WritePlainPost">Plain post</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/WriteTILPost">TIL post</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/WriteTechPost">Tech post</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/WriteDevPost">Dev post</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout">
        <Header className="cl_Tab_Header">
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="cl_Home_Logo cl_Blog_Logo">
              <Link to="/"> CODE | LOG</Link>
            </Menu.Item>
            <Menu.Item className="cl_Blog_Search" style={{ display: display }}>
              <Search
                placeholder="input search text"
                onSearch={(value) => value}
                style={{ width: 200 }}
              />
            </Menu.Item>
            <Menu.Item>
              <Link to="/Blog"> Blog</Link>
            </Menu.Item>
            <Menu.Item>
              <Dropdown overlay={post_type}>
                <a className="ant-dropdown-link" href="#">
                  New story
                </a>
              </Dropdown>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Mypage">My page</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/SignOut">Sign Out</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentPage: state.PostState.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBlog);
