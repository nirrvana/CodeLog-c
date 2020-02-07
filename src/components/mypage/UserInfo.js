import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserInfo extends Component {
  render() {
    return (
      <div className="cl_UserInfo">
        <div className="cl_ApplySheet">
          <Link to="/Resume">이력서</Link>
        </div>
        <div className="cl_ApplySheet">
          <Link to="/CoverLetter">자기소개서</Link>
        </div>
        <div className="cl_ApplySheet">
          <Link to="/Portfolio">포트폴리오</Link>
        </div>
      </div>
    );
  }
}
