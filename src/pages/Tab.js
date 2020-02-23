// * react, redux
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getSessionData,
  getMyPageData,
  getCompanyMyPageData,
} from '../redux/api';
// * css
import { Layout, Menu } from 'antd';
const { Header } = Layout;

class Tab extends Component {
  state = {
    token: false,
    join_type: '',
    username: '',
  };

  componentDidMount() {
    getSessionData()
      .then(({ data: { token, join_type } }) => {
        if (token) {
          if (join_type === 'developer') {
            this.getDeveloperUsername();
          } else {
            this.getCompanyUsername();
          }
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getDeveloperUsername = () => {
    getMyPageData()
      .then(({ data: { username } }) =>
        this.setState({ token: true, join_type: 'developer', username }),
      )
      .catch((err) => {
        throw err;
      });
  };

  getCompanyUsername = () => {
    getCompanyMyPageData()
      .then(({ data: { company_name } }) =>
        this.setState({
          token: true,
          join_type: 'company',
          username: company_name,
        }),
      )
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const { token, join_type } = this.state;
    if (token) {
      if (join_type === 'developer') {
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
                  <Link to="/blog">Blog</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/mypage">My page</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/SignOut">Sign Out</Link>
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
                <Menu.Item disabled="true">
                  <span className="cl_Username">{this.state.username} 님</span>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/companymypage">My page</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/SignOut">Sign Out</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
        );
      }
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
