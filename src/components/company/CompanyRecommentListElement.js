import React, { Component } from 'react';

export default class CompanyRecommentListElement extends Component {
  render() {
    return (
      <div className="cl_Company_Recommend_Element">
        {this.props.data.title}
      </div>
    );
  }
}
