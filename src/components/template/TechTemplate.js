import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { Tag, Input, Button, Avatar, AutoComplete, List } from 'antd';
import CodeBlock from '../../components/postedit/CodeBlock';
import { getTags, postTechPost } from '../../redux/api';

export default class TechTemplate extends Component {
  state = {
    theme: 'tech',
    title: '',
    tech_concept: '',
    tech_background: '',
    tech_definition: '',
    tech_example: '',
    tech_precaution: '',
    tech_recommended_concept: '',
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
    const {
      theme,
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    } = this.state;
    console.log(
      111,
      theme,
      title,
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      selected_tags,
    );

    const content = `${tech_concept}${tech_background}${tech_definition}${tech_example}${tech_precaution}${tech_recommended_concept}`;
    postTechPost(theme, title, content, selected_tags)
      .then((res) => window.alert('post successfully!'))
      .catch((err) => window.alert('fail to post..'));
  };

  render() {
    const {
      tech_concept,
      tech_background,
      tech_definition,
      tech_example,
      tech_precaution,
      tech_recommended_concept,
      tags,
    } = this.state;
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
            <div className="cl_Post_Edit_Subtitle ">Tech concept</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('project_concept')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_concept}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Tech background</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('coding_strategy')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_background}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Tech definition</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('occurred_error')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_definition}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Tech example</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('reference')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_example}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">Tech precaution</div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('lesson')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_precaution}
                  renderers={{
                    code: CodeBlock,
                  }}
                />
              </div>
            </div>
            <div className="cl_Post_Edit_Subtitle ">
              Tech recommended concept
            </div>
            <div className="cl_Plain_Edit_Content ">
              <TextareaAutosize
                className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                onChange={this.handleInputChange('lesson')}
                defaultValue={'hello'}
              />
              <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                <ReactMarkdown
                  source={tech_recommended_concept}
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
