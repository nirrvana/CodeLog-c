import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPage } from '../../redux/action';
import { Link } from 'react-router-dom';
import TabBlog from '../../pages/TabBlog';
import TextareaAutosize from 'react-textarea-autosize';

// * CSS
import { Tag, Input, Button, Avatar, AutoComplete } from 'antd';

const dataSource = ['React', 'Redux', 'TypeScript'];
function onSelect(value) {
  console.log('onSelect', value);
}

class DevPostEdit extends Component {
  state = {
    value: '',
  };
  componentDidMount() {
    this.props.handlePage('Edit');
  }
  handleDeleteLocalData() {
    localStorage.removeItem('currentPost');
  }
  onChange = (value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
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
            <Tag color="red" closable>
              React
            </Tag>
            <Tag color="volcano" closable>
              Redux
            </Tag>
          </div>
          <AutoComplete
            value={value}
            onSelect={onSelect}
            onChange={this.onChange}
            style={{ width: 200 }}
            dataSource={dataSource}
            placeholder="Find a tag"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />

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
