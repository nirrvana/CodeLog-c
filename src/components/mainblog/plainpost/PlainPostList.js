import React, { Component } from 'react';
import PlainPostListElement from './PlainPostListElement';
export default class PlainPostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el, i) => (
          <PlainPostListElement
            key={i + 'PlainPostList'}
            data={el}
          ></PlainPostListElement>
        ))}
      </div>
    );
  }
}
