import React, { Component } from 'react';
import Tab from '../../pages/Tab';

export default class Home extends Component {
  render() {
    return (
      <div>
        {/* 항상 보이는 상단 bar = Tab */}
        <Tab></Tab>
      </div>
    );
  }
}
