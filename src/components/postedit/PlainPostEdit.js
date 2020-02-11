import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentPage } from '../../redux/action';
import { Link } from 'react-router-dom';
import TabBlog from '../../pages/TabBlog';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import 'react-mde/lib/styles/css/react-mde-all.css';
// * CSS
import { Tag, Input, Button, Menu, Icon, Dropdown, Avatar } from 'antd';

class PlainPostEdit extends Component {
  state = {
    input: '',
  };

  componentDidMount() {
    this.props.handlePage('Edit');
  }
  handleInputData = (e) => {
    console.log(e.target.value);
    this.setState({ input: e.target.value });
  };

  handleDeleteLocalData() {
    localStorage.removeItem('currentPost');
  }
  render() {
    console.log(this.props);
    const menu = (
      <Menu>
        <Menu.Item key="1">React</Menu.Item>
        <Menu.Item key="2">Redux</Menu.Item>
        <Menu.Item key="3">TypeScript</Menu.Item>
      </Menu>
    );
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
          <div className="cl_Plain_Edit_Contents ">
            <TextareaAutosize
              className="cl_Plain_Edit_Text cl_Plain_Edit_Content"
              onChange={this.handleInputData}
              defaultValue={
                JSON.parse(localStorage.getItem('currentPost')).contents
              }
            />

            <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Content">
              <ReactMarkdown
                source={this.state.input}
                renderers={{
                  code: CodeBlock,
                }}
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
            <Link to="/PlainPost">Publish</Link>
          </Button>
          <div className="cl_post_Margin"></div>
        </div>
      </div>
    );
  }
}
function CodeBlock(props) {
  return (
    <pre
      style={{
        background: '#000',
        color: 'pink',
        padding: 10,
      }}
    >
      <code>{props.value}</code>
    </pre>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(PlainPostEdit);
