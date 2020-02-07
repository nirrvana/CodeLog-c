import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabBlog from '../../pages/TabBlog';
import { ClikedPost } from '../../redux/action';
// * CSS
import { Comment, Tooltip, Tag, List, Input, Button, Icon } from 'antd';
import moment from 'moment';
const { TextArea } = Input;

const data = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];

class DevPost extends Component {
  state = {
    value: '',
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    const { isEdit } = this.props;
    console.log(isEdit);
    if (isEdit.isEdit) {
    }
    return (
      <div>
        <TabBlog></TabBlog>

        <div className="cl_PlanePost">
          <div className="cl_PlanePost_Title cl_PlanePost_set ">
            What is Dev post ?
          </div>
          <div className="cl_TILPost_Contents cl_PlanePost_Contents ">
            <div className="cl_TILPost_4F">
              Project concept
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
                div> We supply a series of design principles, practical patterns
                and high quality design resources (Sketch and Axure), to help
                people create their product prototypes beautifully and
                efficiently. div> We supply a series of design principles,
                practical patterns and high quality design resources (Sketch and
                Axure), to help people create their product prototypes
                beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Coding Strategy
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Error handling
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently. We
                supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Referenece
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Lesson
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
              </div>
            </div>
          </div>
          <div className="cl_PlanePost_Tag cl_PlanePost_set">
            <Tag color="red">React</Tag>
            <Tag color="volcano">Redux</Tag>
            <Icon type="heart" className="cl_PlanePost_Like" />
          </div>
          <List
            className="cl_PlanePost_Comments "
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
          <div className="cl_PlanePost_Comments_Add cl_PlanePost_set">
            <TextArea
              className="cl_PlanePost_Comments_Add"
              placeholder="Write your feedback !"
              autoSize={{ minRows: 1, maxRows: 6 }}
            />
          </div>
          <Button type="primary" className="cl_PlanePost_Comments_Add_Btn">
            Feedback
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isEdit: state.isEdit,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ClikedPost: (title, contents) => dispatch(ClikedPost(title, contents)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DevPost);
/**
 * 해당 포스트의 데이터를 스테이트로 업데이트하여 에딧에서 사용할 수 있도록
 */
