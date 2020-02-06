import React, { Component } from 'react';

export default class RecommendedCompanyListElement extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        {/* <ul> */}
          <div className="cl_Company_Element">
            <span>{data.id}</span>
            <span>{data.body}</span>
          </div>
        {/* </ul> */}
      </div>
    );
  }
}
