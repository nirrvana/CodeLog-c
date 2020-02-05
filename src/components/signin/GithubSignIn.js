import React, { Component } from 'react';

export default class GithubSignIn extends Component {
  render() {
    return (
      <div>
        <a
          href="https://github.com/login/oauth/authorize?scope=user:email&client_id=c85151d305ad12c78b49"
          // &redirect_uri=http://localhost:3000/callback"
        >
          Login with github
        </a>
      </div>
    );
  }
}
