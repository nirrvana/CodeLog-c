// * react, redux
import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
// * CSS
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import './Tab.css';
const { Header } = Layout;

export default class TabBlog extends Component {
  onChange = (e) => {
    console.log(e.target.value);
  };
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Mypage">My page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Write">New story</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout">
        <Header className="cl_Tab_Header">
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="cl_Home_Logo cl_Blog_Logo">
              CODE | LOG
            </Menu.Item>
            <Menu.Item className="cl_Blog_Search">
              <Icon type="search" />
              <Input
                className="cl_Blog_Search_input"
                placeholder="Search post"
                allowClear
                onChange={this.onChange}
              />
            </Menu.Item>
            <Menu.Item>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  Blog
                </a>
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
