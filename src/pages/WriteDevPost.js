import React, { Component } from 'react';
import TabDev from '../components/template/TabDev';
import DevTemplate from '../components/template/DevTemplate';

export default class WriteDevPost extends Component {
  render() {
    return (
      <div>
        <TabDev />
        <DevTemplate />
      </div>
    );
  }
}
