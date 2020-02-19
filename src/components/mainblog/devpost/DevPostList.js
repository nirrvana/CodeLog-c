import React, { Component } from 'react';
import DevPostListElement from './DevPostListElement';
export default class DevPostList extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="cl_PostList">
        {post.map((el, i) => (
          <DevPostListElement
            key={i + 'DevPostList'}
            data={el}
          ></DevPostListElement>
        ))}
      </div>
    );
  }
}
