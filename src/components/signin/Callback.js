import React, { Component } from 'react';
import { postCodeData } from '../../redux/api';

export default class Callback extends Component {
  componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const code = search.slice(6);

    postCodeData(code)
      .then((res) => {
        console.log('code 전송 성공!');
      })
      .catch((err) => {
        console.log('code 전송 실패..');
      });
  }
  render() {
    return <div></div>;
  }
}
