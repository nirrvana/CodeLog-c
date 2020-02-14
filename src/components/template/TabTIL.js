// * react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * CSS
import { Layout, Menu, Dropdown } from 'antd';
const { Header } = Layout;

export default class TabTIL extends Component {
  render() {
    const post_type = (
      <Menu>
        <Menu.Item>
          <a
            rel="noopener noreferrer"
            href="http://localhost:3000/WritePlainPost"
          >
            PlainPost
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            rel="noopener noreferrer"
            href="http://localhost:3000/WriteDevPost"
          >
            DevPost
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            rel="noopener noreferrer"
            href="http://localhost:3000/WriteTechPost"
          >
            TechPost
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout className="layout">
        <Header className="cl_Tab_Header">
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="cl_Home_Logo">CODE | LOG</Menu.Item>
            <Menu.Item>
              <Dropdown overlay={post_type}>
                <a className="ant-dropdown-link" href="#">
                  New story
                </a>
              </Dropdown>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Blog">Blog</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/MyPage">MyPage</Link>
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
