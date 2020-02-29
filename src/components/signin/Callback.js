import React, { Component } from 'react';
import { postCodeData } from '../../redux/api';

export default class Callback extends Component {
  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const code = search.slice(6);

    postCodeData(code)
      .then((res) => {})
      .catch((err) => {
        throw err;
      });
  }
  render() {
    return <div></div>;
  }
}
