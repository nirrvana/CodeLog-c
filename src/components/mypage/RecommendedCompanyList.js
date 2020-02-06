import React, { Component } from 'react';
import RecommendedCompanyListElement from './RecommendedCompanyListElement';

export default class RecommendedCompanyList extends Component {
  render() {
    const { fakeData } = this.props;
    return (
      <div className="cl_Company_List">
        {fakeData.map((data, index) => (
          <RecommendedCompanyListElement index={index} data={data} />
        ))}
      </div>
    );
  }
}
