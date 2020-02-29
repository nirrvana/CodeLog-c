import React, { Component } from 'react';
import RecommandedPostListElement from './RecommandedPostListElement';

export default class RecommandedPostList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_Home_Content">
        {data.map((el, i) => (
          <RecommandedPostListElement
            key={'RecommandedPost' + i}
            data={el}
          ></RecommandedPostListElement>
        ))}
      </div>
    );
  }
}
