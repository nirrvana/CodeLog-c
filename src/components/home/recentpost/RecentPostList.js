import React, { Component } from 'react';
import RecentPostListElement from './RecentPostListElement';

export default class RecentPostList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_Home_Content">
        {data.map((el, i) => (
          <RecentPostListElement
            key={'RecentPost' + i}
            data={el}
          ></RecentPostListElement>
        ))}
      </div>
    );
  }
}
