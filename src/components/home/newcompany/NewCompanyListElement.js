import React, { Component } from 'react';

export default class NewCompanyListElement extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>
          <div className="cl_ListElement">
            <img
              className="cl_Company_Image"
              src="https://ifh.cc/g/hLaWR.png"
            />
          </div>
        </ul>
      </div>
    );
  }
}
