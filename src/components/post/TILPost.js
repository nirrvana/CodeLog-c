import React, { Component } from 'react';
import Tab from '../../pages/Tab'; // 추후에 TabBlog로 수정
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

export default class TILPost extends Component {
  state = {
    value: '',
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <Tab></Tab>
        <div className="cl_PlanePost">
          <div className="cl_PlanePost_Title cl_PlanePost_set ">
            What is TIL post ?
          </div>
          <div className="cl_TILPost_Contents cl_PlanePost_Contents ">
            <div className="cl_TILPost_4F">
              Fact
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Feeling
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Finding
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </div>
            </div>
            <div className="cl_TILPost_4F">
              Future Action
              <div className="cl_TILPost_4F_content">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
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
