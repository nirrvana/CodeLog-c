import React, { Component } from 'react'
import TabTIL from '../components/template/TabTIL'
import TILTemplate from '../components/template/TILTemplate'

export default class WriteTILPost extends Component {
  render() {
    return (
      <div>
        <TabTIL />
        <TILTemplate />
      </div>
    )
  }
}
