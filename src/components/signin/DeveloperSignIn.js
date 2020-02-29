import React, { Component } from 'react';
import NormalSignIn from './NormalSignIn';
import GithubSignIn from './GithubSignIn';

export default class DeveloperSignIn extends Component {
  render() {
    return (
      <div>
        <NormalSignIn />
        <GithubSignIn />
      </div>
    );
  }
}
