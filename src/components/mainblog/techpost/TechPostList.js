import React, { Component } from 'react';
import TechPostListElement from './TechPostListElement';

export default class TechPostList extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className="cl_PostList">
        {post.map((el, i) => (
          <TechPostListElement
            key={i + 'TechPostList'}
            data={el}
          ></TechPostListElement>
        ))}
      </div>
    );
  }
}
