import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// * Component
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import MyPage from './pages/developer/MyPage';
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
              component={HomePage}
            ></Route>
            <Route path="/SignIn" component={SignIn}></Route>
            <Route
              path="/SignUp"
              component={SignUpPage}
            ></Route>
            <Route path="/MyPage" component={MyPage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
