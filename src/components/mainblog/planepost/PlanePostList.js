import React, { Component } from 'react';
import PlanePostListElement from './PlanePostListElement';
export default class PlanePostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el, i) => (
          <PlanePostListElement
            key={i + 'PlanePostList'}
            data={el}
          ></PlanePostListElement>
        ))}
      </div>
    );
  }
}
