import React, { Component } from 'react'
import TabPlain from '../components/template/TabPlain'
import PlainTemplate from '../components/template/plainTemplate'

export default class WritePlainPost extends Component {
  render() {
    return (
      <div>
        <TabPlain />
        <PlainTemplate />
      </div>
    )
  }
}
