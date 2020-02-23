import React, { Component } from 'react';
import CompanyRecommentListElement from './CompanyRecommentListElement';

export default class CompanyRecommentList extends Component {
  render() {
    const { recommended_developers } = this.props;

    if (recommended_developers === undefined) {
      return <div></div>;
    }
    return (
      <div className="cl_Company_Recommend_List cl_CompanyMyPage_Set">
        {recommended_developers.map((el, i) => {
          return (
            <CompanyRecommentListElement
              key={'recommended_developers' + i}
              recommended_developer={el}
            />
          );
        })}
      </div>
    );
  }
}
