import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PlainPostListElement extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_PostListElement">
        <Link to="/PlainPost">
          <div className="cl_PostListElement_Title"> {data.title}</div>
          <div className="cl_PostListElement_Contents">{data.body}</div>
        </Link>
      </div>
    );
  }
}
