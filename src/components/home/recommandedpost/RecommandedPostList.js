import React, { Component } from 'react';
import RecommandedPostListElement from './RecommandedPostListElement';

export default class RecommandedPostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_Home_Content">
        {fakedata.map((el) => (
          <RecommandedPostListElement data={el}></RecommandedPostListElement>
        ))}
      </div>
    );
  }
}
