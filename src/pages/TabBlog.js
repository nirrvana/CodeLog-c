/* eslint-disable no-unused-vars */
// * react, redux
import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { currentPost } from '../redux/action';

// * CSS
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import './Tab.css';
const { Header } = Layout;
const { Search } = Input;

class TabBlog extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Mypage">My page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Write">New story</Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to={
              '/' +
              JSON.parse(localStorage.getItem('currentPost')).theme +
              'Edit'
            }
          >
            Edit story
          </Link>
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
            <Menu.Item className="cl_Blog_Search">
              <Search
                placeholder="input search text"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              />
            </Menu.Item>
            <Menu.Item>
              <Dropdown overlay={menu}>

                <Link to="/Blog"> Blog</Link>

              </Dropdown>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBlog);
