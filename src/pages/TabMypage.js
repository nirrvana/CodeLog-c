// * react, redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMyPageData } from '../redux/api';
// * CSS
import { Layout, Menu } from 'antd';
const { Header } = Layout;

export default class Tab extends Component {
  state = {
    username: '',
  };

  componentDidMount() {
    getMyPageData()
      .then(({ data: { username } }) => this.setState({ username }))
      .catch((err) => console.log('Fail to get username'));
  }

  render() {
    return (
      <Layout className="layout">
        <Header className="cl_Tab_Header">
          <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.Item className="cl_Home_Logo">
              <Link to="/"> CODE | LOG</Link>
            </Menu.Item>
            <Menu.Item disabled="true">
              <span className="cl_Username">{this.state.username} 님</span>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Blog">Blog</Link>
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
