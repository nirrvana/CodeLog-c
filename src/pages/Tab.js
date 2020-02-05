import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

export default class Tab extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to="/SignUp">Sign Up </Link>
          <Link to="/SignIn">Sign In </Link>
          <Link to="/SignIn">Sign Out</Link>
        </Router>
      </div>
    );
  }
}
