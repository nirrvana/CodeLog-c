import React, { Component } from 'react';

export default class RecommandedPostListElement extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <ul>
          <div className="cl_ListElement">
            <span>{data.body}</span>
          </div>
        </ul>
      </div>
    );
  }
}
