import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// * Component
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
// * CSS
import 'antd/dist/antd.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <HomePage></HomePage>}
            ></Route>
            <Route path="/SignIn" component={() => <SignIn></SignIn>}></Route>
            <Route
              path="/SignUp"
              component={() => <SignUpPage></SignUpPage>}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
