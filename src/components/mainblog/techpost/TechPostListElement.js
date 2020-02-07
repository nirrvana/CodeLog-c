import React, { Component } from 'react';
import { Router, Link, Redirect } from 'react-router-dom';

export default class TechPostListElement extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_PostListElement">
        <Link to="/TechPost">
          <div className="cl_PostListElement_Title"> {data.title}</div>
          <div className="cl_PostListElement_Contents">{data.body}</div>
        </Link>
      </div>
    );
  }
}
