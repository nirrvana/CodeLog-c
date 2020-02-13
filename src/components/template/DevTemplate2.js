import React, { Component } from 'react';
import marked from 'marked';
import { getTags, postDevPost } from '../../redux/api';
import { Tag } from 'antd';
import 'antd/dist/antd.css';
import './Dev.css';

const Preview = (props) => {
  return (
    <div className="preview">
      <div
        dangerouslySetInnerHTML={{
          __html: marked(props.html, { sanitize: true }),
        }}
      />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      className="editor"
    >
      {props.code}
    </textarea>
  );
};

class DevTemplate2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dev',
      title: '',
      content: {
        project_concept: '',
        coding_strategy: '',
        occurred_error: '',
        reference: '',
        lesson: '',
      },
      tags: [],
      selected_tags: [],
    };
  }

  componentDidMount() {
    getTags()
      .then(({ data }) =>
        this.setState({
          tags: data,
        }),
      )
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));
  }

  handleTitleChange = (title) => {
    this.setState({ title });
  };

  handleProjectConceptChange = (project_concept) => {
    this.setState({
      content: {
        ...this.state.content,
        project_concept,
      },
    });
  };

  handleCodingStrategyChange = (coding_strategy) => {
    this.setState({
      content: {
        ...this.state.content,
        coding_strategy,
      },
    });
  };

  handleOccurredErrorChange = (occurred_error) => {
    this.setState({
      content: {
        ...this.state.content,
        occurred_error,
      },
    });
  };

  handleReferenceChange = (reference) => {
    this.setState({
      content: {
        ...this.state.content,
        reference,
      },
    });
  };

  handleLessonChange = (lesson) => {
    this.setState({
      content: {
        ...this.state.content,
        lesson,
      },
    });
  };

  selectTag = (e) => {
    const { selected_tags } = this.state;
    const target = e.target.innerText;
    if (!selected_tags.includes(target)) {
      e.target.className = 'ant-tag ant-tag-blue';
      this.setState({
        selected_tags: [...selected_tags, target],
      });
      console.log(selected_tags);
    } else {
      e.target.className = 'ant-tag';
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== target),
      });
      console.log(selected_tags);
    }
  };

  handleSubmit = (e) => {
    const { theme, title, content, selected_tags } = this.state;
    console.log(111, theme, title, content, selected_tags)

    postDevPost(theme, title, content, selected_tags)
      .then((res) => window.alert('post successfully!'))
      .catch((err) => window.alert('fail to post..'));
  };

  render() {
    const { title, content, tags } = this.state;
    return (
      <div className="container">
        <div className="header">
          <div className="flag"></div>
          <h1 className="edit-flag">Edit Here</h1>
          <h1 className="preview-flag">Preview</h1>
        </div>
        <div className="title">
          <div className="flag">TITLE</div>
          <Editor title={title} onChange={this.handleTitleChange} />
        </div>
        <div className="project_concept">
          <div className="flag">PROJECT CONCEPT</div>
          <Editor
            project_concept={content.project_concept}
            onChange={this.handleProjectConceptChange}
          />
          <Preview html={content.project_concept} />
        </div>
        <div className="coding_strategy">
          <div className="flag">CODING STRATEGY</div>
          <Editor
            coding_strategy={content.coding_strategy}
            onChange={this.handleCodingStrategyChange}
          />
          <Preview html={content.coding_strategy} />
        </div>
        <div className="occurred_error">
          <div className="flag">OCCURRED ERROR</div>
          <Editor
            occurred_error={content.occurred_error}
            onChange={this.handleOccurredErrorChange}
          />
          <Preview html={content.occurred_error} />
        </div>
        <div className="reference">
          <div className="flag">REFERENCE</div>
          <Editor reference={content.reference} onChange={this.handleReferenceChange} />
          <Preview html={content.reference} />
        </div>
        <div className="lesson">
          <div className="flag">LESSON</div>
          <Editor reference={content.lesson} onChange={this.handleLessonChange} />
          <Preview html={content.lesson} />
        </div>
        <div>
          해시태그를 선택해주세요.
          <br />
          {tags.map((tag) => (
            <Tag onClick={this.selectTag}>{tag}</Tag>
          ))}
        </div>
        <button type="button" onClick={this.handleSubmit}>
          Post!
        </button>
      </div>
    );
  }
}

export default DevTemplate2;
