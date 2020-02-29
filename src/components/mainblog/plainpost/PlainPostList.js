import React, { Component } from 'react';
import PlainPostListElement from './PlainPostListElement';
export default class PlainPostList extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="cl_PostList">
        {post.map((el, i) => (
          <PlainPostListElement
            key={i + 'PlainPostList'}
            data={el}
          ></PlainPostListElement>
        ))}
      </div>
    );
  }
}
