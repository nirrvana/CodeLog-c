/* eslint-disable no-unused-vars */
// * react, redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// * CSS
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Tab extends Component {
  render() {
    const { isCompanyUser } = this.props;
    const cookie = document.cookie.slice(6);
    console.log('cookie', cookie);
    let MypagePath, BlogView;
    if (isCompanyUser) {
      MypagePath = '/companymypage';
      BlogView = 'none';
    } else {
      MypagePath = '/mypage';
      BlogView = '';
    }
    if (cookie) {
      return (
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">
                <Link to="/"> CODE | LOG</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/SignOut">Sign Out</Link>
              </Menu.Item>
              <Menu.Item style={{ display: BlogView }}>
                <Link to="/Blog">Blog</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to={MypagePath}>My page</Link>
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
            </Menu>
          </Header>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.session.isLogin,
  isCompanyUser: state.user.isCompanyUser,
});

export default connect(mapStateToProps)(Tab);
