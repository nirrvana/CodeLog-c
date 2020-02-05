import React, { Component } from 'react';
import RecentPostListElement from './RecentPostListElement';

export default class RecentPostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_Home_Content">
        {fakedata.map((el) => (
          <RecentPostListElement data={el}></RecentPostListElement>
        ))}
      </div>
    );
  }
}
