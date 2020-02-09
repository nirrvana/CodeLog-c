import React, { Component } from 'react';
import RecentPostListElement from './RecentPostListElement';

export default class RecentPostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_Home_Content">
        {fakedata.map((el, i) => (
          <RecentPostListElement
            key={'RecentPost' + i}
            data={el}
          ></RecentPostListElement>
        ))}
      </div>
    );
  }
}
