import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { Tag, Input, Button, Avatar, AutoComplete, List } from 'antd';
import CodeBlock from '../../components/postedit/CodeBlock';
import { getTags, postPlainPost } from '../../redux/api';
import { getRandomInt, colorArray } from '../../TagColor';

export default class PlainTemplate2 extends Component {
  state = {
    theme: 'plain',
    title: '',
    content: '',
    tags: [],
    selected_tags: [],
  };

  componentDidMount() {
    getTags()
      .then(({ data: { tags } }) =>
        this.setState({
          tags,
        }),
      )
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));
  }

  handleInputChange = (state) => ({ target: { value: input } }) => {
    this.setState({
      [state]: input,
    });
  };

  selectTag = (e) => {
    const { selected_tags } = this.state;
    const target = e.target.innerText;
    if (!selected_tags.includes(target)) {
      e.target.style['background-color'] = 'blue';
      this.setState({
        selected_tags: [...selected_tags, target],
      });
      console.log(selected_tags);
    } else {
      e.target.style['background-color'] = 'gray';
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== target),
      });
      console.log(selected_tags);
    }
  };

  handleSubmit = (e) => {
    const { theme, title, content, selected_tags } = this.state;
    console.log(111, theme, title, content, selected_tags);

    postPlainPost(theme, title, content, selected_tags)
      .then((res) => window.alert('post successfully!'))
      .catch((err) => window.alert('fail to post..'));
  };

  render() {
    const { content, tags } = this.state;
    return (
      <div>
        <div className="cl_Post">
          <Input
            className="cl_Edit_Title cl_Post_set "
            type="text"
            onChange={this.handleInputChange('title')}
            defaultValue={'title'}
          />
          <div className="cl_Post_author_Info cl_Post_set ">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <div className="cl_Post_author">Root</div>
          </div>
          <div className="cl_Post_Contents ">
            <div className="cl_Post_Edit_Subtitle ">Content</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('content')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={content}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>

            <div className="cl_Post_Tags cl_Post_set">
              <List
                dataSource={tags}
                renderItem={(item) => (
                  <span>
                    <Tag color="gray" onClick={this.selectTag}>
                      {item}
                    </Tag>
                  </span>
                )}
              />
            </div>
            <Button
              type="primary"
              className="cl_Post_Comments_Add_Btn"
              onClick={this.handleSubmit}
            >
              Post!
            </Button>
            <div className="cl_post_Margin"></div>
          </div>
        </div>
      </div>
    );
  }
}
