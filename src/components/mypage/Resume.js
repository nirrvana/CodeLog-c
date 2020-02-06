import React, { Component } from 'react'
import ResumeImg from '../../images/Untitled.png'

export default class Resume extends Component {
  render() {
    return (
      <div className="cl_Resume">
        <img src={ResumeImg} alt="Resume" />
      </div>
    )
  }
}
