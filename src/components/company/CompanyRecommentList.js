import React, { Component } from 'react';
import CompanyRecommentListElement from './CompanyRecommentListElement';

export default class CompanyRecommentList extends Component {
  render() {
    const { recommended_developer } = this.props;
    return (
      <div className="cl_Company_Recommend_List cl_CompanyMyPage_Set">
        {recommended_developer.map((el, i) => {
          return (
            <CompanyRecommentListElement
              key={'recommended_developer' + i}
              recommended_developer={el}
            />
          );
        })}
      </div>
    );
  }
}
