import React, { Component } from 'react';
import CompanyRecommentListElement from './CompanyRecommentListElement';

export default class CompanyRecommentList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_Company_Recommend_List cl_CompanyMyPage_Set">
        {data.map((el, i) => {
          return (
            <CompanyRecommentListElement
              key={'CompanyRecommentList' + i}
              data={el}
            />
          );
        })}
      </div>
    );
  }
}
