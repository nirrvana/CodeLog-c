import React, { Component } from 'react';
import NewCompanyListElement from './NewCompanyListElement';

export default class NewCompanyList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cl_Home_Content">
        {data.map((el, i) => (
          <NewCompanyListElement
            key={'NewCompany' + i}
            data={el}
          ></NewCompanyListElement>
        ))}
      </div>
    );
  }
}
