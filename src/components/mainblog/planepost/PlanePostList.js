import React, { Component } from 'react';
import PlanePostListElement from './PlanePostListElement';
export default class PlanePostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el) => (
          <PlanePostListElement data={el}></PlanePostListElement>
        ))}
      </div>
    );
  }
}
