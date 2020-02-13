import React, { Component } from 'react';
//* parser
import ReactMde from 'react-mde';
import Showdown from 'showdown';
//* redux
import { getTags, postPlainPost } from '../../redux/api';
//* antd
import { Tag } from 'antd';
import 'antd/dist/antd.css';
import './Plain.css';

class PlainTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'plain',
      title: '',
      content: '',
      tab: 'write',
      tags: ['react', 'redux', 'hooks'], // ** API 생기면 fetch 받아온 tag 리스트를 넣어주기 **
      selected_tags: [],
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
  }

  componentDidMount() {
    getTags()
      .then(({ tags }) => this.setState({ tags }))
      .catch((err) => console.log('태그목록 가져오기에 실패하였습니다'));
  }

  handleTitleChange = ({ target: { value: title } }) => {
    this.setState({ title });
  };

  handleValueChange = (content) => {
    this.setState({ content });
  };

  handleTabChange = (tab) => {
    this.setState({ tab });
  };

  handleTagSelect = (e) => {
    const { selected_tags } = this.state;
    const selected_tag = e.target.innerText;
    if (!selected_tags.includes(selected_tag)) {
      e.target.className = 'ant-tag ant-tag-blue';
      this.setState({
        selected_tags: [...selected_tags, selected_tag],
      });
      console.log(selected_tags);
    } else {
      e.target.className = 'ant-tag';
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== selected_tag),
      });
      console.log(selected_tags);
    }
  };

  handleSubmit = () => {
    const { theme, title, content, selected_tags } = this.state;
    console.log(1006, theme, title, content, selected_tags)
    postPlainPost({ theme, title, content, selected_tags })
      .then((res) => window.alert('post가 작성되었습니다!'))
      .catch((err) => window.alert('post 작성에 실패하였습니다!'));
  };

  render() {
    const { content } = this.state;
    console.log(11, content);
    return (
      <div className="container">
        <input
          type="text"
          className="title"
          placeholder="title"
          onChange={this.handleTitleChange}
        />
        <ReactMde
          onChange={this.handleValueChange}
          onTabChange={this.handleTabChange}
          value={this.state.content}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={this.state.tab}
        />
        {this.state.tags.map((tag) => (
          <Tag onClick={this.handleTagSelect}>{tag}</Tag>
        ))}
        <br />
        <button type="button" onClick={this.handleSubmit}>
          Post!
        </button>
      </div>
    );
  }
}

export default PlainTemplate;
