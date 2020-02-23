// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * File
import { randomColor } from '../../TagColor';
import { getCompanyMyPageData } from '../../redux/api';

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

// ? 글자 수 제한 메소드
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
      company_data: {
        company_tags: [
          '🦷',
          '🍿',
          '👍',
          '👽',
          '왹져',
          '헤이',
          '유교걸',
          '삼강오륜',
          '붕우유신',
          '뎃걸',
        ],
      },
      visible: false,
      TagVisible: false,
      isMember: '',
      isEdit: 'none',
      isDelete: 'none',
    };
  }
  componentDidMount() {
    getCompanyMyPageData().then((res) => {
      this.setState({
        company_data: Object.assign(this.state.company_data, res.data),
      });
    });
  }
  // ? 멤버 CRUD 메소드
  handleInputValue = (key) => (e) => {
    if (key === 'isEdit') {
      this.setState({ [key]: '', isDelete: 'none', isMember: 'none' });
    } else if (key === 'isMember') {
      this.setState({ isEdit: 'none', isDelete: 'none', [key]: '' });
    } else {
      this.setState({ [key]: '', isEdit: 'none', isMember: '' });
    }
  };
  handleDeleteCompanyMember = (item) => {
    this.setState({
      data: this.state.data.filter((el) => el.id !== item.id),
    });
  };
  // ? 멤버 CRUD modal 메소드
  handleMemberAdd = () => {
    if (this.state.company_data.Users.length === 5) {
      message.error('기업 유저는 최대 5명까지 추가할 수 있습니다.');
    } else {
      this.showModal('member');
    }
  };
  showModal = (part) => {
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

  // ? 기업 정보 메소드
  handleCompanyInfoValue = (e) => {
    this.setState({
      ...this.state,
      company_data: {
        ...this.state.company_data,
        info: e.target.value,
      },
    });
  };

  // ! RENDER
  render() {
    const { company_data } = this.state;
    console.log('company_data:', company_data);
    if (!Object.keys(company_data)) {
      return <></>;
    }
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1" onClick={this.handleInputValue('isMember')}>
          Member
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.handleMemberAdd}>Add member</Menu.Item>
        <Menu.Item onClick={this.handleInputValue('isEdit')}>
          Edit member
        </Menu.Item>
        <Menu.Item onClick={this.handleInputValue('isDelete')}>
          Delete member
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">
                <Link to="/">CODE | LOG</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/SignOut">Sign Out</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>

        <div className="cl_CompanyMyPage">
          <Link to="/CompanyMypage" className="cl_Post_Edit_Btn">
            Update
          </Link>
          <div className="cl_Company_Name cl_CompanyMyPage_Set">
            <input
              defaultValue={company_data.company_name}
              className="cl_Company_Name_Input"
              placeholder="Company name"
            />
          </div>

          <div className="cl_Company_Edit_Info cl_CompanyMyPage_Set">
            <textarea
              className="cl_Company_Edit_content"
              rows="10"
              cols="16"
              name="contents"
              placeholder="Company information"
              onChange={this.handleCompanyInfoValue}
              onKeyUp={() => fnChkByte(company_data.info, '250')}
              defaultValue={company_data.info}
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
              dataSource={company_data.Users}
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
                    title={
                      <div style={{ display: this.state.isMember }}>
                        {item.username}
                        <span
                          style={{
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginLeft: '1%',
                          }}
                        >{`${item.position}`}</span>
                      </div>
                    }
                    description={
                      <div style={{ display: this.state.isMember }}>
                        {item.email}
                      </div>
                    }
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
              {company_data.company_name}'s Tag
              <span>
                <Icon
                  type="plus-circle"
                  className="cl_Company_Tag_Plus"
                  onClick={() => this.showModal('tag')}
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
              <List
                dataSource={company_data.company_tags}
                renderItem={(item) => (
                  <span>
                    <Tag
                      closable
                      className="cl_Company_Tag"
                      color={randomColor()}
                    >
                      {item}
                    </Tag>
                  </span>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
