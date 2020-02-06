import React, { Component } from 'react';
import TILPostListElement from './TILPostListElement';

export default class TILPostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_PostList">
        {fakedata.map((el) => (
          <TILPostListElement data={el}></TILPostListElement>
        ))}
      </div>
    );
  }
}
