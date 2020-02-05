import React, { Component } from 'react';
import NewPostListElement from './NewPostListElement';

export default class NewPostList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_Home_Content">
        {fakedata.map((el) => (
          <NewPostListElement data={el}></NewPostListElement>
        ))}
      </div>
    );
  }
}
