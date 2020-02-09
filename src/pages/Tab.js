/* eslint-disable no-unused-vars */
// * react, redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// * CSS
import { Layout, Menu } from 'antd';
import './Tab.css';
const { Header } = Layout;

class Tab extends Component {
  render() {
    const { isLogin } = this.props;
    if (isLogin) {
      return (
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">
                <Link to="/"> CODE | LOG</Link>
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
    } else {
      return (
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">
                <Link to="/"> CODE | LOG</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/SignUp">Sign Up</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/SignIn">Sign In</Link>
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
}

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
});

export default connect(mapStateToProps)(Tab);
