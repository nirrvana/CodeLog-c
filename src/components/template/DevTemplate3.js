import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { Tag, Input, Button, Avatar, AutoComplete, List } from 'antd';
import CodeBlock from '../../components/postedit/CodeBlock';
import { getTags, postDevPost } from '../../redux/api';
import { getRandomInt, colorArray } from '../../TagColor';

export default class DevTemplate3 extends Component {
  state = {
    theme: 'dev',
    title: '',
    project_concept: '',
    coding_strategy: '',
    occurred_error: '',
    reference: '',
    lesson: '',
    tags: [],
    selected_tags: [],
  };

  componentDidMount() {
    getTags()
      .then(({ data }) =>
        this.setState({
          tags: data,
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
      e.target.style['background-color'] = 'blue'
      this.setState({
        selected_tags: [...selected_tags, target],
      });
      console.log(selected_tags);
    } else {
      e.target.style['background-color'] = 'gray'
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== target),
      });
      console.log(selected_tags);
    }
  };

  handleSubmit = (e) => {
    const {
      theme,
      title,
      project_concept,
      coding_strategy,
      occurred_error,
      reference,
      lesson,
      selected_tags,
    } = this.state;
    console.log(
      111,
      theme,
      title,
      project_concept,
      coding_strategy,
      occurred_error,
      reference,
      lesson,
      selected_tags,
    );

    const content = `${project_concept}${coding_strategy}${occurred_error}${reference}${lesson}`;
    postDevPost(theme, title, content, selected_tags)
      .then((res) => window.alert('post successfully!'))
      .catch((err) => window.alert('fail to post..'));
  };

  render() {
    const { project_concept, coding_strategy, occurred_error, reference, lesson, tags } = this.state;
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
            <div className="cl_Post_Edit_Subtitle ">Project concept</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('project_concept')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={project_concept}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Coding strategy</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('coding_strategy')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={coding_strategy}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Occurred error</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('occurred_error')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={occurred_error}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Reference</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('reference')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={reference}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Lesson</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('lesson')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={lesson}
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
                    <Tag
                      color="gray"
                      onClick={this.selectTag}
                    >
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
