import React, { Component } from 'react';
import { Router, Link, Redirect } from 'react-router-dom';

export default class TILPostListElement extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="cl_PostListElement">
        <Link to="/TILPost">
          <div className="cl_PostListElement_Title"> {data.title}</div>
          <div className="cl_PostListElement_Contents">{data.body}</div>
        </Link>
      </div>
    );
  }
}
