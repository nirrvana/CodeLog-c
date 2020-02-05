// * react, redux
import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
// * antd
import { Layout, Menu } from 'antd';
const { Header } = Layout;

export default class Tab extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header className="cl_Tab_Header">
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="cl_Home_Logo">CODE | LOG</Menu.Item>
            <Menu.Item>
              <Link to="/SignUp">Sign Up</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/SignIn">Sign In</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/">Sign Out</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Blog">Blog</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Mypage">My page</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
