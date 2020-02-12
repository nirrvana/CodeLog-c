// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * File
import CompanyRecommentList from './CompanyRecommentList';
import fakedata from '../../fakedata';
// * CSS
import { Layout, Menu, List, Avatar, Tag } from 'antd';

const { Header } = Layout;

export default class CompanyMyPage extends Component {
  state = {
    data: [
      { id: 1, name: 'elsa', email: 'elsa@frozen.com' },
      { id: 2, name: 'anna', email: 'anna@frozen.com' },
      { id: 3, name: 'olaf', email: 'olaf@frozen.com' },
      { id: 4, name: 'root', email: 'root@example.com' },
      { id: 5, name: 'lion', email: 'loin@example.com' },
    ],
  };

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header className="cl_Tab_Header">
            <Menu mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item className="cl_Home_Logo">CODE | LOG</Menu.Item>
              <Menu.Item>
                <Link to="/">Sign Out</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <div className="cl_CompanyMyPage">
          <Link to="/CompanyEdit" className="cl_Post_Edit_Btn">
            Edit
          </Link>
          <div className="cl_Company_Name cl_CompanyMyPage_Set">
            WARR MANTION
          </div>

          <div className="cl_Company_Info cl_CompanyMyPage_Set">
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently. We supply a
            series of design principles, practical patterns and high quality
            design resources (Sketch and Axure), to help people create their
            product prototypes beautifully and efficiently.We supply a series of
            design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product
            prototypes beautifully and efficiently.We supply a series of design
            principles, practical patterns and high quality design resources
            (Sketch and Axure), to help people create their product prototypes
            beautifully and efficiently.We supply a series of design principles,
            practical patterns and high quality design resources (Sketch and
            Axure), to help people create their product prototypes beautifully
            and efficiently.
          </div>
          <div className="cl_Company_Members cl_CompanyMyPage_Set">
            <div className="cl_Company_Member_Header">Member</div>

            <List
              className="cl_Company_Member"
              dataSource={this.state.data}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.name}
                    description={item.email}
                  />
                </List.Item>
              )}
            ></List>
          </div>
          <div className="cl_Company_Tags cl_CompanyMyPage_Set">
            <div className="cl_Tags_Header"> WARR MATION's Tag</div>
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
              Developer for WARR MANTION
            </div>
            <CompanyRecommentList data={fakedata}></CompanyRecommentList>
          </div>
        </div>
      </div>
    );
  }
}
