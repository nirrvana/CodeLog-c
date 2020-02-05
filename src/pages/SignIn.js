import React, { Component } from 'react'
import NormalSignIn from '../components/signin/NormalSignIn'
import GithubSignIn from '../components/signin/GithubSignIn'

export default class SignIn extends Component {
  render() {
    return (
      <div>
        <NormalSignIn />
        <GithubSignIn />
      </div>
    )
  }
}
