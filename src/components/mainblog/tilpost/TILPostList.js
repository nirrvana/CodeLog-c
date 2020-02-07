import React, { Component } from 'react';
import TILPostListElement from './TILPostListElement';

export default class TILPostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el, i) => (
          <TILPostListElement
            key={i + 'TILPostList'}
            data={el}
          ></TILPostListElement>
        ))}
      </div>
    );
  }
}
