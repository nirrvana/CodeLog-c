import React, { Component } from 'react';
import Tab from '../components/template/Tab';
// import DevTemplate from '../components/template/DevTemplate'
import DevTemplate from '../components/template/DevTemplate3';

export default class WriteDevPost extends Component {
  render() {
    return (
      <div>
        <Tab />
        <br />
        <br />
        <br />
        <DevTemplate />
      </div>
    );
  }
}
