import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { currentPage } from '../../redux/action';
import { Link } from 'react-router-dom';
import TabBlog from '../../pages/TabBlog';
import ReactMde from 'react-mde';
// import ReactDOM from 'react-dom';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
// * CSS
import { Tag, Input, Button, Menu, Icon, Dropdown, Avatar } from 'antd';

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: 'Andre',
          value: '@andre',
        },
        {
          preview: 'Angela',
          value: '@angela',
        },
        {
          preview: 'David',
          value: '@david',
        },
        {
          preview: 'Louise',
          value: '@louise',
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const menu = (
  <Menu>
    <Menu.Item key="1">React</Menu.Item>
    <Menu.Item key="2">Redux</Menu.Item>
    <Menu.Item key="3">TypeScript</Menu.Item>
  </Menu>
);

function PlanePostEdit(props) {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('currentPost')).contents,
  );
  const [selectedTab, setSelectedTab] = React.useState('write');
  useEffect(() => {
    // props.handlePage('Edit');
  });

  function handleDeleteLocalData() {
    localStorage.removeItem('currentPost');
  }
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
        <div className="cl_Post_Contents ">
          <div className="cl_Post_Content">
            <div className="container">
              <ReactMde
                className="cl_Edit_content"
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
                loadSuggestions={loadSuggestions}
              />
            </div>
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
          onClick={() => handleDeleteLocalData()}
        >
          <Link to="/PlanePost">Publish</Link>
        </Button>
        <div className="cl_post_Margin"></div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanePostEdit);
