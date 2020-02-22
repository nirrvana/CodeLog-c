// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * File
import fakedata from '../../fakedata';
import { getCompanyMyPageData } from '../../redux/api';
import CompanyRecommentList from './CompanyRecommentList';
// * CSS
import { Layout, Menu, List, Avatar, Tag } from 'antd';

const { Header } = Layout;

export default class CompanyMyPage extends Component {
  state = {
    company_data: {},
  };
  componentDidMount() {
    getCompanyMyPageData().then((res) => {
      this.setState({
        company_data: Object.assign(this.state.company_data, res.data),
      });
    });
  }
  render() {
    const { company_data } = this.state;
    console.log('DATA:', company_data);

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
          <Link to="/CompanyEdit" className="cl_Post_Edit_Btn">
            Edit
          </Link>
          <div className="cl_Company_Name cl_CompanyMyPage_Set">
            {company_data.company_name}
          </div>

          <div className="cl_Company_Info cl_CompanyMyPage_Set">
            {company_data.info}
          </div>
          <div className="cl_Company_Members cl_CompanyMyPage_Set">
            <div className="cl_Company_Member_Header">Member</div>

            <List
              className="cl_Company_Member"
              dataSource={company_data.Users}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                      <div>
                        {item.username}
                        <span
                          style={{
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginLeft: '1%',
                          }}
                        >{`${item.position}`}</span>
                      </div>
                    }
                    description={item.email}
                  />
                </List.Item>
              )}
            ></List>
          </div>
          <div className="cl_Company_Tags cl_CompanyMyPage_Set">
            <div className="cl_Tags_Header">
              {company_data.company_name}'s Tag
            </div>
            <div>
              <Tag className="cl_Company_Tag" color="magenta">
                magenta
              </Tag>
              <Tag className="cl_Company_Tag" color="volcano">
                volcano
              </Tag>
              <Tag className="cl_Company_Tag" color="red">
                red
              </Tag>
              <Tag className="cl_Company_Tag" color="orange">
                orange
              </Tag>
              <Tag className="cl_Company_Tag" color="gold">
                gold
              </Tag>
              <Tag className="cl_Company_Tag" color="lime">
                lime
              </Tag>
              <Tag className="cl_Company_Tag" color="green">
                green
              </Tag>
              <Tag className="cl_Company_Tag" color="cyan">
                cyan
              </Tag>
              <Tag className="cl_Company_Tag" color="blue">
                blue
              </Tag>
              <Tag className="cl_Company_Tag" color="geekblue">
                geekblue
              </Tag>
              <Tag className="cl_Company_Tag" color="purple">
                purple
              </Tag>
            </div>
          </div>
          <div className="cl_Company_Recommend cl_CompanyMyPage_Set">
            <div className="cl_Company_Recommend_Header">
              Developer for {company_data.company_name}
            </div>
            <CompanyRecommentList data={fakedata}></CompanyRecommentList>
          </div>
        </div>
      </div>
    );
  }
}
