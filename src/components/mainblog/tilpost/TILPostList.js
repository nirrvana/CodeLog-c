import React, { Component } from 'react';
import TILPostListElement from './TILPostListElement';

export default class TILPostList extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="cl_PostList">
        {post.map((el, i) => (
          <TILPostListElement
            key={i + 'TILPostList'}
            data={el}
          ></TILPostListElement>
        ))}
      </div>
    );
  }
}
