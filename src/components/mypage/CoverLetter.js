import React, { Component } from 'react'
import CoverLetterImg from '../../images/자기소개서.png'

export default class CoverLetter extends Component {
  render() {
    return (
      <div className="cl_CoverLetter">
        <img src={CoverLetterImg} alt="CoverLetter" />
      </div>
    )
  }
}
