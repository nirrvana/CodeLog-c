import React, { Component } from 'react';
import TechPostListElement from './TechPostListElement';

export default class TechPostList extends Component {
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el, i) => (
          <TechPostListElement
            key={i + 'TechPostList'}
            data={el}
          ></TechPostListElement>
        ))}
      </div>
    );
  }
}
