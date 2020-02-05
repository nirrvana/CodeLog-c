import React, { Component } from 'react';
import TechPostListElement from './TechPostListElement';

export default class TechPostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el) => (
          <TechPostListElement data={el}></TechPostListElement>
        ))}
      </div>
    );
  }
}
