import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//* redux
import { connect } from 'react-redux';
import { getTags, postTILPost } from '../../redux/api';
import { currentPost } from '../../redux/action';
//* library
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import CodeBlock from '../../components/postedit/CodeBlock';
import debounce from 'lodash.debounce';
//* css
import { Tag, Input, Button, Avatar, List, message, Modal } from 'antd';
class TILTemplate extends Component {
  constructor() {
    super();
    this.state = {
      theme: 'til',
      title: '',
      til_fact: '',
      til_feeling: '',
      til_finding: '',
      til_future_action: '',
      selected_tags: [],
      tags: [],
      visible: false,
      isPosted: false,
    };
    this.handleDebounceInputChange = debounce(
      this.handleDebounceInputChange,
      1000,
    );
  }

  componentDidMount() {
    getTags()
      .then(({ data: { tags } }) =>
        this.setState({
          tags,
        }),
      )
      .catch((err) => console.log('태그목록을 받아오지 못하였습니다.'));

    this.checkData();
  }

  checkData = () => {
    const saved = JSON.parse(localStorage.getItem('til'));
    if (saved) {
      this.setState({ visible: true });
    }
  };

  getData = (e) => {
    const saved = JSON.parse(localStorage.getItem('til'));
    const {
      title,
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
      selected_tags,
    } = saved;
    this.setState({
      visible: false,
      title,
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
      selected_tags,
    });
  };

  dropData = (e) => {
    this.setState({
      visible: false,
    });
    localStorage.removeItem('til');
  };

  handleInputChange = (state) => ({ target: { value: input } }) => {
    this.setState({
      [state]: input,
    });
    this.handleDebounceInputChange();
  };

  handleDebounceInputChange = () => {
    const {
      theme,
      title,
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
      selected_tags,
    } = this.state;
    localStorage.setItem(
      theme,
      JSON.stringify({
        title,
        til_fact,
        til_feeling,
        til_finding,
        til_future_action,
        selected_tags,
      }),
    );
  };

  selectTag = (e) => {
    const { selected_tags } = this.state;
    const target = e.target.innerText;

    if (!selected_tags.includes(target)) {
      e.target.className = 'ant-tag-blue';
      this.setState({
        selected_tags: [...selected_tags, target],
      });
    } else {
      e.target.className = '';
      this.setState({
        selected_tags: selected_tags.filter((tag) => tag !== target),
      });
    }
    this.handleDebounceInputChange('selected_tags');
  };

  handleSubmit = (e) => {
    const {
      theme,
      title,
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
      selected_tags,
    } = this.state;

    const content = {
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
    };

    if (/\S/.test(title)) {
      postTILPost(theme, title, content, selected_tags)
        .then(({ data: { post_id } }) => {
          this.props.handlePost(post_id);
          message.success('Post successfully!');
          this.setState({ isPosted: true });
          localStorage.removeItem('til');
        })
        .catch((err) => message.error('Fail to post..'));
    } else {
      message.error('Please input title value');
    }
  };

  render() {
    const {
      title,
      til_fact,
      til_feeling,
      til_finding,
      til_future_action,
      selected_tags,
      tags,
      visible,
      isPosted,
    } = this.state;
    if (isPosted) {
      return <Redirect to="TILPost" />;
    } else {
      return (
        <div>
          <Modal
            title="confirm"
            visible={visible}
            onOk={this.getData}
            onCancel={this.dropData}
          >
            <p>Would you like to go to what you were working on?</p>
          </Modal>
          <div className="cl_Post">
            <Input
              className="cl_Edit_Title cl_Post_set "
              type="text"
              onChange={this.handleInputChange('title')}
              value={title}
              placeholder="title"
            />
            <div className="cl_Post_author_Info cl_Post_set ">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <div className="cl_Post_author">Root</div>
            </div>
            <div className="cl_Post_Contents ">
              <div className="cl_Post_Edit_Subtitle ">Fact</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('til_fact')}
                  defaultValue={til_fact}
                  placeholder="사실"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={til_fact}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Feeling</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('til_feeling')}
                  defaultValue={til_feeling}
                  placeholder="느낌"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={til_feeling}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Finding</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('til_finding')}
                  defaultValue={til_finding}
                  placeholder="교훈"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={til_finding}
                    renderers={{
                      code: CodeBlock,
                    }}
                  />
                </div>
              </div>
              <div className="cl_Post_Edit_Subtitle ">Future action</div>
              <div className="cl_Plain_Edit_Content ">
                <TextareaAutosize
                  className="cl_Plain_Edit_Text cl_Plain_Edit_Set"
                  onChange={this.handleInputChange('til_future_action')}
                  defaultValue={til_future_action}
                  placeholder="행동"
                />
                <div className="cl_Plain_Edit_Markdown cl_Plain_Edit_Set">
                  <ReactMarkdown
                    source={til_future_action}
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
                        color={selected_tags.includes(item) ? 'blue' : ''}
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
}

const mapDispatchToProps = (dispatch) => ({
  handlePost: (id) => dispatch(currentPost(id)),
});

export default connect(null, mapDispatchToProps)(TILTemplate);
