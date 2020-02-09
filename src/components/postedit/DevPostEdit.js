import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPage } from '../../redux/action';
import { Link } from 'react-router-dom';
import TabBlog from '../../pages/TabBlog';
import TextareaAutosize from 'react-textarea-autosize';

// * CSS
import { Tag, Input, Button, Menu, Icon, Dropdown, Avatar } from 'antd';
const menu = (
  <Menu>
    <Menu.Item key="1">React</Menu.Item>
    <Menu.Item key="2">Redux</Menu.Item>
    <Menu.Item key="3">TypeScript</Menu.Item>
  </Menu>
);

class DevPostEdit extends Component {
  componentDidMount() {
    this.props.handlePage('Edit');
  }
  handleDeleteLocalData() {
    localStorage.removeItem('currentPost');
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <TabBlog></TabBlog>
        <div className="cl_Post">
          <Input
            className="cl_Edit_Title cl_Post_set "
            type="text"
            defaultValue={JSON.parse(localStorage.getItem('currentPost')).title}
          />
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">Root</div>
          </div>
          <div className=" cl_Post_Contents ">
            <div className="cl_Post_Content">
              Project concept
              <div className="cl_Edit_content">
                <TextareaAutosize
                  className="cl_Edit_content"
                  type="text"
                  defaultValue={
                    JSON.parse(localStorage.getItem('currentPost')).contents
                  }
                />
              </div>
            </div>
            <div className="cl_Post_Content">
              Coding Strategy
              <TextareaAutosize
                className="cl_Edit_content"
                type="text"
                defaultValue={
                  JSON.parse(localStorage.getItem('currentPost')).contents
                }
              />
            </div>
            <div className="cl_Post_Content">
              Error handling
              <TextareaAutosize
                className="cl_Edit_content"
                type="text"
                defaultValue={
                  JSON.parse(localStorage.getItem('currentPost')).contents
                }
              />
            </div>
            <div className="cl_Post_Content">
              Referenece
              <TextareaAutosize
                className="cl_Edit_content"
                type="text"
                defaultValue={
                  JSON.parse(localStorage.getItem('currentPost')).contents
                }
              />
            </div>
            <div className="cl_Post_Content">
              Lesson
              <TextareaAutosize
                className="cl_Edit_content"
                type="text"
                defaultValue={
                  JSON.parse(localStorage.getItem('currentPost')).contents
                }
              />
            </div>
          </div>
          <div className="cl_Post_Tag cl_Post_set">
            {/* map을 이용하여 받은 태그 표현? */}
            <Tag color="red" closable>
              React
            </Tag>
            <Tag color="volcano" closable>
              Redux
            </Tag>
          </div>
          <Dropdown overlay={menu} className="cl_Tag_selector">
            <Button>
              Add tag <Icon type="down" />
            </Button>
          </Dropdown>
          <Button
            type="primary"
            className="cl_Edit_Publish_Btn"
            onClick={() => this.handleDeleteLocalData()}
          >
            <Link to="/DevPost">Publish</Link>
          </Button>
          <div className="cl_post_Margin"></div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PostState: state.PostState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handlePage: (page) => {
      dispatch(currentPage(page));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DevPostEdit);
