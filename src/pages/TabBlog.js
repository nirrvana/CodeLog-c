/* eslint-disable no-unused-vars */
// * react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentPost } from '../redux/action';

// * CSS
import { Layout, Menu, Input, Dropdown } from 'antd';
import './Tab.css';
const { Header } = Layout;
const { Search } = Input;
/**
 * current page state 가 blog이면 inline post 이면 none
 */
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
    console.log(this.props);

    const post_type = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:3000/PlainPost">
            PlainPost
          </a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:3000/DevPost">
            DevPost
          </a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:3000/TechPost">
            TechPost
          </a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="http://localhost:3000/TILPost">
            TILPost
          </a>
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
                onSearch={(value) => console.log(value)}
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
              <Link to="/">Sign Out</Link>
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
