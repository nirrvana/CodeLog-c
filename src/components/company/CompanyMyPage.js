// * Library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// * File
import CompanyRecommentList from './CompanyRecommentList';
import fakedata from '../../fakedata';
// * CSS
import { Layout, Menu, List, message, Avatar, Spin, Tag } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl =
  'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const { Header } = Layout;

export default class CompanyMyPage extends Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  };
  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
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

            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={false}
            >
              <List
                className="cl_Company_Member"
                dataSource={this.state.data}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                  </List.Item>
                )}
              >
                {this.state.loading && this.state.hasMore && (
                  <div className="cl_Company_Member_loading">
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
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
