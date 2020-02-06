import React, { Component } from 'react';
import NewCompanyListElement from './NewCompanyListElement';

export default class NewCompanyList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { fakedata } = this.props;
    return (
      <div className="cl_Home_Content">
        {fakedata.map((el) => (
          <NewCompanyListElement data={el}></NewCompanyListElement>
        ))}
      </div>
    );
  }
}
