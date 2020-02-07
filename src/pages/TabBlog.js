// * react, redux
import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { EditState } from '../redux/action';

// * CSS
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import './Tab.css';
const { Header } = Layout;

class TabBlog extends Component {
  state = {
    isEdit: false,
  };
  onChange = (e) => {
    console.log(e.target.value);
  };
  handleIsEditState() {
    this.setState({ isEdit: !this.state.isEdit });
  }
  render() {
    const { handleIsEditState, isEdit } = this.props;
    console.log(isEdit);

    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/Mypage">My page</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Write">New story</Link>
        </Menu.Item>
        <Menu.Item onClick={() => handleIsEditState(true)}>
          Edit story
          {/* <Link to="/Edit"> Edit story</Link> */}
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
  console.log(state);
  /**
   * 해당 컴포넌트에서 스테이트를 프롭스로 사용할 수 있도록한다.
   */
  return {
    isEdit: state.isEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  /**
   * 해당 컴포넌트에서 스테이트를 프롭스로 사용할 수 있도록한다.
   * 디스패치로 EditState(boolean)의 결과값인 엑션을 리듀서에 보내서 스테이트를 변경할 수 있도록한다.
   */
  return {
    handleIsEditState: (boolean) => dispatch(EditState(boolean)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBlog);
