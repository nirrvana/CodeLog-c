import React, { Component } from 'react';
import DevPostListElement from './DevPostListElement';
export default class DevPostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el) => (
          <DevPostListElement data={el}></DevPostListElement>
        ))}
      </div>
    );
  }
}
