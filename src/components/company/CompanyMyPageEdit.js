// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * File
import CompanyRecommentList from './CompanyRecommentList';
import fakedata from '../../fakedata';
// * CSS
import {
  Layout,
  Menu,
  List,
  Avatar,
  Tag,
  Input,
  Modal,
  Icon,
  Dropdown,
  message,
} from 'antd';
const { Header } = Layout;
// ? 글자수 제한
function fnChkByte(str, maxByte) {
  var str_len = str.length;

  var rbyte = 0;
  var rlen = 0;
  var one_char = '';
  var str2 = '';

  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글2Byte
    } else {
      rbyte++; //영문 등 나머지 1Byte
    }

    if (rbyte <= maxByte) {
      rlen = i + 1; //return할 문자열 갯수
    }
  }

  if (rbyte > maxByte) {
    // alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
    alert('메세지는 최대 ' + maxByte + 'byte를 초과할 수 없습니다.');
    str2 = str.substr(0, rlen); //문자열 자르기
    str = str2;
    fnChkByte(str, maxByte);
  } else {
    document.getElementById('byteInfo').innerText = rbyte;
  }
}

export default class CompanyMyPageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, name: 'elsa', email: 'elsa@frozen.com' },
        { id: 2, name: 'anna', email: 'anna@frozen.com' },
        { id: 3, name: 'olaf', email: 'olaf@frozen.com' },
        { id: 4, name: 'root', email: 'root@example.com' },
        { id: 5, name: 'lion', email: 'loin@example.com' },
      ],
      CompanyInfoValue: null,
      visible: false,
      TagVisible: false,
      isEdit: 'none',
      isDelete: 'none',
    };
    this.handleCompanyInfoValue = this.handleCompanyInfoValue.bind(this);
    this.handleDeleteCompanyMember = this.handleDeleteCompanyMember.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    if (key === 'isEdit') {
      this.setState({ [key]: '', isDelete: 'none' });
    } else if (key === 'member') {
      this.setState({ isEdit: 'none', isDelete: 'none' });
    } else {
      this.setState({ [key]: '', isEdit: 'none' });
    }
  };
  handleCompanyInfoValue(e) {
    this.setState({ CompanyInfoValue: e.target.value });
  }

  handleDeleteCompanyMember(item) {
    this.setState({
      data: this.state.data.filter((el) => el.id !== item.id),
    });
  }
  // ? modal
  showModal = (part) => (e) => {
    if (part === 'member') {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        TagVisible: true,
      });
    }
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
      TagVisible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      TagVisible: false,
    });
  };

  // ! RENDER
  render() {
    const { data } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1" onClick={this.handleInputValue('member')}>
          Member view
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={
            data.length === 5
              ? () =>
                  message.error('기업 유저는 최대 5명까지 추가할 수 있습니다.')
              : this.showModal('member')
          }
        >
          Add member
        </Menu.Item>
        <Menu.Item onClick={this.handleInputValue('isEdit')}>
          Edit member
        </Menu.Item>
        <Menu.Item onClick={this.handleInputValue('isDelete')}>
          Delete member
        </Menu.Item>
      </Menu>
    );

    console.log(this.state);

    return (
      <div>
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">
                <Link to="/">CODE | LOG</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">Sign Out</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>

        <div className="cl_CompanyMyPage">
          <Link to="/CompanyMypage" className="cl_Post_Edit_Btn">
            Update
          </Link>
          <div className="cl_Company_Name cl_CompanyMyPage_Set">
            <Input
              className="cl_Company_Name_Input"
              defaultValue={'WARR MANTION'}
            />
          </div>

          <div className="cl_Company_Edit_Info cl_CompanyMyPage_Set">
            <textarea
              className="cl_Company_Edit_content"
              rows="10"
              cols="16"
              name="contents"
              onChange={this.handleCompanyInfoValue}
              onKeyUp={() => fnChkByte(this.state.CompanyInfoValue, '250')}
              defaultValue={'hello'}
            />
            <span id="byteInfo">0 </span> <span> / </span> 250 bytes
          </div>
          <div className="cl_Company_Members cl_CompanyMyPage_Set">
            <div className="cl_Company_Member_Header">
              Member
              <Dropdown
                overlay={menu}
                trigger={['click']}
                className="cl_Company_Member_Dropdown"
              >
                <Icon type="down" />
              </Dropdown>
              <Modal
                className="cl_Company_Member_Add_Modal"
                title="Add member"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <div className="cl_Company_Member_Add_Input">
                  <Input
                    style={{ height: '10%', marginBottom: '7%' }}
                    placeholder="name"
                  ></Input>
                  <Input
                    placeholder="email"
                    style={{ height: '10%', marginBottom: '3%' }}
                  ></Input>
                </div>
              </Modal>
            </div>

            <List
              className="cl_Company_Member"
              dataSource={this.state.data}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <div
                    className="cl_Company_Member_Edit"
                    style={{ display: this.state.isEdit }}
                  >
                    <Input
                      style={{
                        height: '10%',
                        marginBottom: '3%',
                      }}
                      placeholder="name"
                      onChange={this.handleCompanyMemberValue_name}
                    ></Input>
                    <Input
                      placeholder="email"
                      style={{ height: '10%', marginBottom: '3%' }}
                      onChange={this.handleCompanyMemberValue_email}
                    ></Input>
                  </div>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.name}
                    description={item.email}
                  />

                  <div>
                    <span
                      style={{ display: this.state.isDelete }}
                      onClick={() => this.handleDeleteCompanyMember(item)}
                    >
                      Delete
                    </span>
                  </div>
                </List.Item>
              )}
            ></List>
          </div>
          <div className="cl_Company_Tags cl_CompanyMyPage_Set">
            <div className="cl_Tags_Header">
              WARR MATION's Tag{' '}
              <span>
                {' '}
                <Icon
                  type="plus-circle"
                  className="cl_Company_Tag_Plus"
                  onClick={this.showModal('tag')}
                />
              </span>
              <Modal
                className="cl_Company_Member_Add_Modal"
                title="Add member"
                visible={this.state.TagVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <div className="cl_Company_Member_Add_Input">
                  <Input
                    style={{ height: '10%', marginBottom: '7%' }}
                    placeholder="Tag name"
                  ></Input>
                </div>
              </Modal>
            </div>

            <div>
              <Tag className="cl_Company_Tag" closable color="magenta">
                magenta
              </Tag>
              <Tag className="cl_Company_Tag" closable color="volcano">
                volcano
              </Tag>
              <Tag className="cl_Company_Tag" closable color="red">
                red
              </Tag>
              <Tag className="cl_Company_Tag" closable color="orange">
                orange
              </Tag>
              <Tag className="cl_Company_Tag" closable color="gold">
                gold
              </Tag>
              <Tag className="cl_Company_Tag" closable color="lime">
                lime
              </Tag>
              <Tag className="cl_Company_Tag" closable color="green">
                green
              </Tag>
              <Tag className="cl_Company_Tag" closable color="cyan">
                cyan
              </Tag>

              <Tag className="cl_Company_Tag" closable color="purple">
                purple
              </Tag>
            </div>
          </div>
          <div className="cl_Company_Recommend cl_CompanyMyPage_Set">
            <div className="cl_Company_Recommend_Header">
              Developer for WARR MANTION
            </div>
            <CompanyRecommentList data={fakedata}></CompanyRecommentList>
          </div>
        </div>
      </div>
    );
  }
}
