import React, { Component } from 'react';
import { getHashTagList } from '../../redux/api';
import { Tag } from 'antd';
import 'antd/dist/antd.css';

export default class WriteHashTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag_list: ['React', 'Redux', 'Hooks'],
    };
  }

  componentDidMount() {
    getHashTagList()
      .then(({ hashtag_list }) => {
        this.setState({
          hashtag_list,
        });
      })
      .catch((err) => {
        console.log('Fail to get hashtag_list');
      });
  }

  updateHashtag = () => {
    this.setState()
  }

  render() {
    return (
      <div>
        {this.state.hashtag_list.map((hashtag, index) => (
          <Tag color="orange" index={index} onClick={this.updateHashtag}>{hashtag}</Tag>
        ))}
      </div>
    );
  }
}
